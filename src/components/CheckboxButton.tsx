import React from "react";
import styled, { css } from "styled-components";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxButton = ({ label, checked, onChange }: Props) => (
  <StyledButton
    type="button"
    checked={checked}
    onClick={() => onChange(!checked)}
  >
    {label}
  </StyledButton>
);

const StyledButton = styled("button")<{ checked: boolean }>`
  border-radius: 24px;
  padding: 0px 16px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px;
  border: 0;
  height: 36px;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.16) 0px 2px 4px;
  }

  ${props =>
    props.checked &&
    css`
      box-shadow: #28a745 0px 0px 0px 2px;

      &:hover {
        box-shadow: #28a745 0px 0px 0px 2px, rgba(0, 0, 0, 0.16) 0px 2px 4px;
      }
    `}
`;
