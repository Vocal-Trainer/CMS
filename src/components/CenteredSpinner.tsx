import styled from "styled-components";
import { Spin } from "antd";

export const CenteredSpinner = () => {
  return (
    <StyledSpinner>
      <Spin size="large" />
    </StyledSpinner>
  );
};

const StyledSpinner = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
`;
