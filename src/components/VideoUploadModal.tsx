import { useState } from "react";
import { Col, Modal, Progress, Row, Alert } from "antd";
import BJButton, { ButtonTypes } from "./theme/atoms/Button";
import styled from "styled-components";

interface videoCompressProps {
  show: boolean;
  transcode: boolean;
  onHide: () => void;
  setUploadResolution?: (resolution: string) => void;
  uploadResolution?: string;
  url: string | null;
  uploadVideo: (file: ArrayBuffer, fileName: string) => Promise<void>;
  setUploadUrl: (url: string) => void;
  fileName: string;
  fileSize: number;
  resolutions: { key: string; value: string; display: string }[];
  videoSrc: ArrayBuffer;
  title?: string;
  allowNaturalImageUpload?: boolean;
  defaultCropBoxWidth?: number;
  defaultCropBoxHeight?: number;
  transcodeProgress: number;
  uploadProgress: number;
  loading: boolean;
  message?: string;
  error?: string;
}

export const VideoUploadModal = ({
  show,
  transcode,
  onHide,
  url,
  uploadVideo,
  fileName,
  videoSrc,
  title,
  allowNaturalImageUpload,
  transcodeProgress,
  uploadProgress,
  loading,
  message,
  error,
}: videoCompressProps) => {
  const [saving, setSaving] = useState(false);

  const handleCloseModal = () => {
    setSaving(false);
    onHide();
  };

  const handleCropCancel = () => {
    handleCloseModal();
  };

  const handleUploadVideo = async (): Promise<void> => {
    setSaving(true);
    await uploadVideo(videoSrc, fileName);
    setSaving(false);
  };

  const footer = [
    <BJButton
      key="ftbcau1"
      buttonType={ButtonTypes.Secondary}
      onClick={handleCropCancel}
    >
      Cancel
    </BJButton>,
  ];

  return (
    <StyledModal
      destroyOnClose={true}
      maskClosable={false}
      title={title}
      visible={show}
      onCancel={handleCloseModal}
      footer={
        allowNaturalImageUpload
          ? [
              ...footer,
              <BJButton
                key="smcaub1"
                buttonType={ButtonTypes.Save}
                disabled={saving || !videoSrc}
                loading={loading}
                size="middle"
                onClick={async () => {
                  handleUploadVideo();
                }}
              >
                Upload video
              </BJButton>,
            ]
          : footer
      }
    >
      {error && (
        <Row>
          <StyledCol>
            <Alert showIcon message={error} type="error" />
          </StyledCol>
        </Row>
      )}
      <Row>
        <Col span={24}>
          <video src={url} controls width={450} height={300} />
        </Col>
        <Col span={24}>
          {transcode && (
            <div>
              <span>Compressing: </span>
              <span>
                <Progress percent={transcodeProgress} status="active" />
              </span>
            </div>
          )}
          {uploadProgress > 0 && (
            <div>
              <span>Uploading: </span>
              <Progress percent={uploadProgress} status="active" />
            </div>
          )}
          {message && (
            <div>
              <span>Status: </span>
              <span>{message}</span>
            </div>
          )}
        </Col>
      </Row>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .ant-space-align-center {
      margin-right: 0.625rem;
    }
  }
`;

const StyledCol = styled(Col)`
  margin-bottom: 1rem;
`;
