import { Alert, Col, Form, Modal, Row, Typography } from "antd";
import { ReactNode, useState } from "react";
import { generateFormError } from "../utils";
import { BJFlex } from "./styled";
import BJButton, { ButtonTypes } from "./theme/atoms/Button";
import { NotificationType } from "./theme/util/notificationObj";
import { BJNotification } from "./theme/atoms/BJNotification";

const { Paragraph } = Typography;

type ModalType = {
  formId?: string;
  messageOnSubmit?: boolean;
  show?: boolean;
  onHide: () => void;
  title?: { titleId: string; titleText: string };
  deleting?: boolean;
  error?: string | null;
  onDelete?: () => Promise<void>;
  enableSave: boolean;
  enableDelete: boolean;
  onSubmit: () => void;
  modalTitle: string;
  modalSubTitle?: string;
  size?: "sm" | "lg" | "xl" | undefined;
  recordIdentifier?: string;
};

type PropsWithChildren = { children?: ReactNode };

export const FormModal = ({
  formId,
  show,
  onHide,
  onDelete,
  children,
  enableSave,
  enableDelete,
  onSubmit,
  modalTitle,
  modalSubTitle,
  recordIdentifier,
  messageOnSubmit = true,
  size,
}: ModalType & PropsWithChildren) => {
  const [deleting, setDeleting] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async () => {
    try {
      setError(null);
      setSaving(true);
      await onSubmit();
      messageOnSubmit &&
        BJNotification({
          type: NotificationType.Success,
          message: "Update record",
          description: `${recordIdentifier ?? "Record"} updated`,
        });
      setSaving(false);
      onHide();
    } catch (err) {
      const errorMessage = generateFormError(err);
      console.log(err);
      setError(errorMessage);
      messageOnSubmit &&
        BJNotification({
          type: NotificationType.Error,
          message: " Error",
          description: errorMessage,
        });
    } finally {
      setSaving(false);
    }
  };

  const onDeleteRecord = async () => {
    setDeleting(true);
    try {
      onDelete && (await onDelete());
      messageOnSubmit &&
        BJNotification({
          type: NotificationType.Success,
          message: "Record deleted",
          description: `${recordIdentifier ?? "Record"} Deleted successfully`,
        });

      onHide();
    } catch (err) {
      const errorMessage = generateFormError(err);
      setError(errorMessage);
      messageOnSubmit &&
        BJNotification({
          type: NotificationType.Error,
          message: "Error deleting record",
          description: errorMessage,
        });
    } finally {
      setDeleting(false);
      setDeleteState(false);
    }
  };

  return (
    <Modal
      {...(size
        ? size === "sm"
          ? { width: "20%" }
          : size === "lg"
          ? { width: "50%" }
          : size === "xl"
          ? { width: "80%" }
          : {}
        : {})}
      destroyOnClose
      title={
        <Col span={24}>
          {modalTitle && <Paragraph ellipsis>{modalTitle}</Paragraph>}
          {modalSubTitle && <Paragraph>{modalSubTitle}</Paragraph>}
        </Col>
      }
      visible={show}
      onCancel={() => {
        setError(null);
        onHide();
      }}
      footer={
        deleteState ? (
          <Row justify="end">
            <BJButton
              buttonType={ButtonTypes.Secondary}
              onClick={() => setDeleteState(false)}
            >
              No, cancel
            </BJButton>
            <BJButton
              buttonType={ButtonTypes.Delete}
              onClick={onDeleteRecord}
              loading={deleting}
              disabled={deleting}
            >
              Yes, delete!
            </BJButton>
          </Row>
        ) : (
          <Row justify="end">
            {enableDelete && (
              <BJButton
                buttonType={ButtonTypes.Delete}
                onClick={() => setDeleteState(true)}
              >
                Delete
              </BJButton>
            )}
            <BJButton
              buttonType={ButtonTypes.Save}
              key={formId ?? "formModal"}
              form={formId ?? "formModal"}
              disabled={saving || !enableSave}
              loading={saving}
              htmlType="submit"
            >
              Save
            </BJButton>
          </Row>
        )
      }
    >
      {error && (
        <BJFlex centerJustify>
          <Alert showIcon message={error} type="error" />
        </BJFlex>
      )}
      <Form
        id={formId ?? "formModal"}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        {children}
      </Form>
    </Modal>
  );
};
