import { Input, InputProps } from "antd";
import React from "react";
import styled from "styled-components";

interface BJInputProps extends InputProps {
  BJDefault?: boolean;
}
const BJInput = React.forwardRef((props: BJInputProps, _) =>
  props.BJDefault ? (
    <StyledInput bordered={false} size="large" {...props} />
  ) : (
    <StyledInput {...props} />
  )
);
BJInput.displayName = "BJInput";

const StyledInput = styled(({ BJDefault, ...props }: BJInputProps) => (
  <Input {...props} />
))`
  background-color: ${props =>
    props.BJDefault ? props.theme.secondary : props.theme.white} !important;
  padding: 0.6rem;
  .ant-input-affix-wrapper > input,
  .ant-input {
    padding-left: 1rem !important;
  }
`;

export default BJInput;
