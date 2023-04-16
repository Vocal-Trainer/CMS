import { ReactNode, useState } from "react";
import { BackButton, ConfirmationModal, CenteredSpinner } from "./";
import { commonErrors } from "../language";
import BJButton, { ButtonTypes } from "./theme/atoms/Button";
import Layout from "antd/lib/layout/layout";
import Row from "antd/lib/row";
import { Space, Spin, Typography, Col, Divider, Form, Alert } from "antd";
import { NotificationType } from "./theme/util/notificationObj";
import styled from "styled-components";
import { generateFormError } from "../utils";
import { BJFlex } from "./styled";
import { BJNotification } from "./theme/atoms/BJNotification";

const { Text } = Typography;

export enum FormEditType {
  ADD,
  EDIT,
  VIEW,
}

type EditType = {
  onRemove?: () => Promise<void>;
  enableSave: boolean;
  title?: string;
  id?: string;
  subTitle?: string;
  error?: string | null;
  hasValidationErrors?: boolean;
  editType: FormEditType;
  loading: boolean;
  onSubmit?: () => void;
  recordIdentifier?: string;
  backRoutePath?: string;
  successMessage?: string;
  successMessageTitle?: string;
  deleteMessageTitle?: string;
  deleteMessage?: string;
  additionalButtons?: JSX.Element[];
  textToOverrideSave?: string;
  deleteButtonText?: string;
  deleteConfirmationMessage?: string;
  renderButtonsOnFooter?: boolean;
};

type PropsWithChildren<T> = T & { children?: ReactNode };

export const FormEdit: React.FC<PropsWithChildren<EditType>> = ({
  enableSave,
  onRemove,
  children,
  error: FormError,
  title,
  editType,
  id,
  loading,
  onSubmit,
  subTitle,
  recordIdentifier,
  backRoutePath,
  successMessage,
  successMessageTitle,
  deleteMessageTitle,
  deleteMessage,
  additionalButtons,
  textToOverrideSave,
  deleteButtonText,
  deleteConfirmationMessage,
  renderButtonsOnFooter = false,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSubmit!();
      BJNotification({
        type: NotificationType.Success,
        message: successMessageTitle ?? "Update record",
        description:
          successMessage ?? `${recordIdentifier ?? "Record"} updated`,
      });

      setSaving(false);
    } catch (err) {
      const serverErrorMessage = generateFormError(err);
      setError(serverErrorMessage);
      BJNotification({
        type: NotificationType.Error,
        message: " Error",
        description: serverErrorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    try {
      setShowDeleteModal(false);
      setDeleting(true);
      if (onRemove) await onRemove();
      BJNotification({
        type: NotificationType.Success,
        message: deleteMessageTitle ?? "Record deleted",
        description:
          deleteMessage ??
          `${recordIdentifier ?? "Record"} Deleted successfully`,
      });
      setDeleting(false);
    } catch (err) {
      const serverErrorMessage = generateFormError(err);
      setError(serverErrorMessage);
      BJNotification({
        type: NotificationType.Error,
        message: "Error deleting record",
        description: serverErrorMessage,
      });
    } finally {
      setDeleting(false);
    }
  };

  const renderButtons = () => (
    <Sticky
      justify={renderButtonsOnFooter ? "end" : "space-between"}
      align="middle"
    >
      {!renderButtonsOnFooter && (
        <BackButton routePath={backRoutePath ?? `../`} />
      )}

      {renderButtonsOnFooter && <Divider />}
      <Space direction="horizontal">
        {editType === FormEditType.EDIT && onRemove && (
          <BJButton
            className="mr-2"
            buttonType={ButtonTypes.Delete}
            onClick={() => setShowDeleteModal(true)}
            size="large"
          >
            {deleting ? <Spin /> : deleteButtonText ?? "Delete"}
          </BJButton>
        )}
        <BJButton
          buttonType={ButtonTypes.Save}
          disabled={saving || !enableSave}
          loading={saving}
          size="large"
          htmlType="submit"
        >
          {textToOverrideSave ?? "Save"}
        </BJButton>
        {additionalButtons && [...additionalButtons]}
      </Space>
    </Sticky>
  );

  return (
    <Layout>
      <ConfirmationModal
        show={showDeleteModal}
        text={deleteConfirmationMessage ?? commonErrors.onRemoveContentError}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
      />

      <Form name="Basic" layout="vertical" onFinish={onFinish}>
        {!renderButtonsOnFooter && renderButtons()}

        {loading || deleting ? (
          <StyledSpinnerContainer>
            <CenteredSpinner />
          </StyledSpinnerContainer>
        ) : (
          <>
            {!renderButtonsOnFooter && <Divider />}
            {title && (
              <Row>
                <Col span={24}>
                  <Typography.Title level={2}>{title}</Typography.Title>
                  {id && <Text type="secondary">ID : {id}</Text>}
                  {subTitle && <Text type="secondary">{subTitle}</Text>}
                </Col>
              </Row>
            )}
            {(error || FormError) && (
              <BJFlex centerJustify>
                <WrappedCol>
                  <Alert showIcon message={error} type="error" />
                  {!error && FormError && (
                    <Alert showIcon message={FormError} type="error" />
                  )}
                </WrappedCol>
              </BJFlex>
            )}
            {children}
            {renderButtonsOnFooter && renderButtons()}
          </>
        )}
      </Form>
    </Layout>
  );
};
//Navbar top
const Sticky = styled(Row)`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  border-radius: 25px;
`;

const WrappedCol = styled(Col)`
  padding: 1rem;
`;
const StyledSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;
