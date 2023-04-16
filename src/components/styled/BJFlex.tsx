import styled from "styled-components";

type FlexProps = {
  centerJustify?: boolean;
  justifyRight?: boolean;
  mTop?: number;
  mBottom?: number;
  mLeft?: number;
  pRight?: number;
  row?: boolean;
  alignCenter?: boolean;
  flex?: number;
  justifySpaceBetween?: boolean;
};

const BJFlex = styled.div<FlexProps>`
  display: flex;
  flex: ${props => props.flex && props.flex};
  flex-direction: ${props => `${props.row ? "row" : "column"}`};
  margin-right: 50.313 rem;
  margin-top: ${props => `${props.mTop}rem`};
  margin-left: ${props => `${props.mLeft}rem`};
  margin-bottom: ${props => `${props.mBottom}rem`};
  padding-right: ${props => `${props.pRight}rem`};
  justify-content: ${({
    centerJustify,
    justifyRight,
    justifySpaceBetween,
  }: FlexProps) =>
    centerJustify
      ? "center"
      : justifyRight
      ? "flex-end"
      : justifySpaceBetween
      ? "space-between"
      : "flex-start"};
  align-items: ${({ alignCenter }: FlexProps) =>
    alignCenter ? "center" : null};
`;

export { BJFlex };
