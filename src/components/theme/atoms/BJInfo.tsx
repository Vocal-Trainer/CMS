import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import styled from "styled-components";

export const BJInfo = ({ info }: { info: string }) => {
  return (
    <Tooltip title={info}>
      <InfoCircleOutlined />
    </Tooltip>
  );
};

export const BJFormLabelInfo = ({
  label,
  info,
}: {
  label: string;
  info: string;
}) => {
  return (
    <StyledDivContainer>
      <StyledDiv>{label}</StyledDiv>
      {info && <BJInfo info={info} />}
    </StyledDivContainer>
  );
};

const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const StyledDiv = styled.div`
  margin-right: 0.5rem;
`;
