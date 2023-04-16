import { Typography } from "antd";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import styled, { DefaultTheme } from "styled-components";
import { imageUploadMessages } from "../../../language";

interface BJDropInterface {
  disabled: boolean;
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  accept: string[];
  error?: string;
  fileSize?: number;
}

const BJDrop = ({
  disabled,
  onDrop,
  accept,
  error,
  fileSize,
}: BJDropInterface) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept, //: ["video/*", "audio/*"],
    disabled: disabled,
  });
  return (
    <>
      <Container
        style={{ backgroundColor: disabled ? "#f5f5f5" : "" }}
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} disabled={disabled} />
        <Typography.Paragraph>
          Drag &#39;n&#39; drop some files here, or click to select files
        </Typography.Paragraph>
      </Container>
      {(fileRejections.length > 0 || error) && (
        <Typography.Paragraph type="danger">
          {error ? error : imageUploadMessages.imageUploadError}
        </Typography.Paragraph>
      )}
      {fileSize && (
        <Typography.Paragraph type="secondary">
          {`File size: ${fileSize.toFixed(2)} MB`}
        </Typography.Paragraph>
      )}
    </>
  );
};

const Container = styled.div<{
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  border-width: 0.125rem;
  border-radius: 0.125rem;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${props => props.theme.active};
  color: ${props => props.theme.secondary};
  outline: none;
  cursor: pointer;
  transition: border 0.24s ease-in-out;
  margin-bottom: 0.625rem;
`;

const getColor = (props: {
  theme: DefaultTheme;
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}) => {
  if (props.isDragAccept) {
    return props.theme.button.success;
  }
  if (props.isDragReject) {
    return props.theme.button.danger;
  }
  if (props.isDragActive) {
    return props.theme.button.success;
  }
  return props.theme.icon.gray;
};

export { BJDrop };
