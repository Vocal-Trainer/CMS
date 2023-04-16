import styled from "styled-components";

interface IconWrapper {
  hoverEffect?: boolean;
  disabled?: boolean;
}

export const StyledIframe = styled.iframe`
  border: 0;
  width: 95%;
  min-height: 1000px;
`;

export const IconWrapper = styled.div<IconWrapper>`
  padding-top: 2px;
  margin-left: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${props => props && props.disabled && `color: #e2dfe7; pointer-events: none;`}
  ${props =>
    props.hoverEffect &&
    ` &:hover {
    transform: scale(1.6);
  }`}
`;
