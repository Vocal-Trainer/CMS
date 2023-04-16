import { Modal } from "antd";
import { FaInstagram, FaLink } from "react-icons/fa";
import { IconWrapper } from "./styled/BJCommonStyles";
import styled from "styled-components";
import BJCopy from "./theme/atoms/BJCopy";

interface ModalProps {
  deepLink: string;
  dynamicLink: string;
  show: boolean;
  onHide: (e: React.MouseEvent<HTMLElement>) => void;
}

export const DeeplinkCopyModal = ({
  show,
  deepLink,
  dynamicLink,
  onHide,
}: ModalProps) => {
  return (
    <div onClick={e => e.stopPropagation()}>
      <Modal
        title={"Click to copy"}
        visible={show}
        onCancel={onHide}
        destroyOnClose={true}
        footer={null}
        width={350}
        mask={true}
      >
        <ButtonsWrapper>
          <ButtonWrapper>
            <IconWrapper disabled={false}>
              <BJCopy textToCopy={deepLink} onClick={onHide}>
                <FaLink size={35} className="mr-2" />
              </BJCopy>
            </IconWrapper>
            <span>Deep Link</span>
          </ButtonWrapper>
          <ButtonWrapper>
            <IconWrapper disabled={false}>
              <BJCopy textToCopy={dynamicLink} onClick={onHide}>
                <FaInstagram size={35} className="mr-3" />
              </BJCopy>
            </IconWrapper>
            <span>Instagram Link</span>
          </ButtonWrapper>
        </ButtonsWrapper>
      </Modal>
    </div>
  );
};

const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.625rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  span {
    margin-top: 0.625rem;
  }
`;
