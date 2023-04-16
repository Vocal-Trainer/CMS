import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationType } from "../util/notificationObj";
import { BJNotification } from "./BJNotification";
import { FaCopy } from "react-icons/fa";
import { IconWrapper } from "../../styled/BJCommonStyles";

interface BJCopyProps {
  textToCopy: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const BJCopy = ({
  textToCopy,
  onClick,
  children,
  disabled = false,
}: BJCopyProps) => {
  const [text, setText] = useState(textToCopy);

  useEffect(() => {
    setText(textToCopy);
  }, [textToCopy]);

  const onCopy = () => {
    BJNotification({
      type: NotificationType.Success,
      message: "Copied to clipboard",
      description: `${text} copied`,
    });
  };
  return (
    <CopyToClipboard
      onCopy={onCopy}
      options={{ message: "Whoa!" }}
      text={textToCopy}
    >
      <IconWrapper
        disabled={disabled}
        hoverEffect
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          onClick && onClick(e);
        }}
      >
        {children ? children : <FaCopy />}
      </IconWrapper>
    </CopyToClipboard>
  );
};
export default BJCopy;
