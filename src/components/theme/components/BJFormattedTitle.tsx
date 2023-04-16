import { Space, Typography } from "antd";

export const BJFormattedTitle = ({
  title,
  text,
}: {
  title: string;
  text?: string;
}) => {
  return (
    <Space>
      <Typography.Text strong>{title}:</Typography.Text>
      <span>{text ?? text}</span>
    </Space>
  );
};
