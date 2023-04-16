import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface Props {
  className?: string;
  text: string;
  onDelete: () => void;
}

export const Badge = ({ className, text, onDelete }: Props) => (
  <Container className={className}>
    <span className="text">{text}</span>
    <Close onClick={onDelete}>
      <FaTimes size={10} />
    </Close>
  </Container>
);

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding-left: 8px;
  background-color: var(--primary);
  font-size: 12px;
  color: var(--white);
  border-radius: 100px;
  overflow: hidden;

  .text {
    margin-right: 4px;
  }
`;

const Close = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 5px 0px 3px;
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;
