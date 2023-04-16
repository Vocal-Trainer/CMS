import { Button } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";
import React, { FC } from "react";
import styled, { css } from "styled-components";

const BJButton: FC<BJButtonProps> = ({
  children,
  icon,
  buttonType,
  onClick,
  rounded,
  ...btnProps
}) => {
  return (
    <StyledButton
      onClick={onClick}
      buttonType={buttonType}
      rounded={rounded ? rounded : false}
      {...btnProps}
      icon={icon && <IconWrapper>{icon}</IconWrapper>}
    >
      {children}
    </StyledButton>
  );
};

export enum ButtonTypes {
  Add = "add",
  Save = "save",
  Secondary = "secondary",
  Delete = "delete",
  Primary = "primary",
}
interface BJButtonProps extends NativeButtonProps {
  icon?: JSX.Element;
  buttonType?: ButtonTypes;
  onClick?: (e: any) => any;
  rounded?: boolean;
}

const StyledButton = styled(
  ({ rounded, buttonType, ...props }: BJButtonProps) => <Button {...props} />
)`
  background-color: ${props => props.theme.button.primary};
  color: ${props => props.theme.white};
  border-radius: ${props => (props.rounded ? "10rem" : "15px")};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: none;
  box-shadow: none;
  padding-left: 1.8rem !important;
  padding-right: 1.8rem !important;
  &:hover {
    background-color: ${props => props.theme.primary};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  display: flex;
  justify-content: center;
  align-items: center;

  &.ant-btn-loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.primary};
  }

  &.ant-btn > .ant-btn-loading-icon {
    display: flex;
  }

  ${props => props.disabled && `opacity:0.5;`}

  ${props => {
    switch (props.buttonType) {
      case "add": {
        return css`
          background-color: ${props => props.theme.primary} !important;
          color: ${props => props.theme.text.primary} !important;
        `;
      }
      case "save": {
        return css`
          background-color: ${props => props.theme.button.success} !important;
          color: ${props => props.theme.white} !important;
        `;
      }
      case "secondary": {
        return css`
          background-color: ${props => props.theme.button.secondary} !important;
          color: ${props => props.theme.text.primary} !important;
        `;
      }
      case "delete": {
        return css`
          background-color: ${props => props.theme.white} !important;
          color: ${props => props.theme.text.danger} !important;
          border: 0.063rem solid ${props => props.theme.button.danger} !important;
        `;
      }
      default: {
        return css`
          background-color: ${props => props.theme.button.primary} !important;
          color: ${props => props.theme.white} !important;
        `;
      }
    }
  }}
`;

const IconWrapper = styled.div`
  padding-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default BJButton;
