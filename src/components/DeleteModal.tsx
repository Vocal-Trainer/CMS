import { Modal, Typography } from "antd";
interface Props {
  text: string;
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  additionalContent?: () => JSX.Element;
}

export const ConfirmationModal = ({
  show,
  text,
  onHide,
  onConfirm,
  additionalContent,
}: Props) => {
  return (
    <Modal
      title="Are you sure ?"
      visible={show}
      onOk={onConfirm}
      onCancel={onHide}
      okType="danger"
      okText="Yes"
      cancelText="No, cancel"
    >
      <Typography.Text>{text}</Typography.Text>
      {additionalContent && additionalContent()}
    </Modal>
  );
};
