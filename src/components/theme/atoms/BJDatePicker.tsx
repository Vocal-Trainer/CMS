import { DatePicker, DatePickerProps } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { theme } from "../util/theme";
import { ReactComponent as DatePickerIcon } from "./datepickericon.svg";

const BJDatePicker: FC<DatePickerProps> = ({ suffixIcon, ...props }) => {
  return (
    <StyledDatePicker
      bordered={false}
      suffixIcon={
        suffixIcon ? (
          <StyledIconWrapper>{suffixIcon}</StyledIconWrapper>
        ) : (
          <StyledIconWrapper>
            <DatePickerIcon />
          </StyledIconWrapper>
        )
      }
      allowClear={false}
      format={"DD/MM/YYYY"}
      size={"large"}
      {...props}
    />
  );
};

const StyledDatePicker = styled(DatePicker)`
  &.ant-picker,
  .ant-picker-borderless {
    background-color: ${theme.primary} !important;
    border-radius: 1rem;
  }
  .ant-picker-input {
    flex-direction: row-reverse !important;
  }
  &.ant-picker-large .ant-picker-input > input {
    padding-left: 0.016rem;
  }
  .ant-picker-clear {
    background: transparent !important;
  }
`;

const StyledIconWrapper = styled.div`
  padding-right: 0.6rem;
`;

export default BJDatePicker;
