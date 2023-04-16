import { Select } from "antd";
import styled from "styled-components";

export const BJFilterSelect = styled(Select)`
  min-width: 11rem;
  background-color: ${props => props.theme.secondary};
  border-radius: 10rem;
`;
