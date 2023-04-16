import { Typography } from "antd";
import { BJFlex } from "./styled";
import BJButton from "./theme/atoms/Button";

export const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <BJFlex
      centerJustify
      style={{ flexDirection: "column", alignItems: "center" }}
    >
      <Typography.Text>
        Oops! Something went wrong! Help us improve your experience by sending
        an error report
      </Typography.Text>
      <Typography.Paragraph>{error.message} </Typography.Paragraph>
      <BJButton onClick={resetErrorBoundary}>Try again</BJButton>
    </BJFlex>
  );
};
