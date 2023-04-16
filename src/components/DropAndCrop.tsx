import { useCallback, useEffect, useMemo, useState } from "react";
import { CropModal as CropAndUpload } from "./CropAndUpload";
import { imageUploadMessages } from "../language";
import { Col, Row, Typography } from "antd";
import {
  AspectRatio,
  convertBytesToMbs,
  getRatioByTitle,
  UPLODABLE_IMAGE_SIZE,
} from "../utils";
import { ImagePresenter } from "./ImagePresenter";
import { v4 as uuidv4 } from "uuid";
import { BJDrop } from "./theme";

export interface FileUploadProps {
  uploadImage: (file: Blob, fileName: string) => Promise<string>;
  enableCrop?: boolean;
  initialUrl?: string | null | undefined;
  setUploadUrl: (url: string | null) => void;
  title?: string;
  lockedRatio?: AspectRatio;
  defaultSelectedRatio?: AspectRatio;
  allowNaturalImageUpload?: boolean;
  defaultCropBoxWidth?: number;
  defaultCropBoxHeight?: number;
  fileNamePrefix?: string;
  previewImageWidth?: string;
  disabled?: boolean;
  extra?: string;
  croppable?: boolean;
  accept?: string[];
}

export function DropAndCrop(props: FileUploadProps) {
  const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(null);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<ReactCrop.Crop | null>(
    null
  );

  useEffect(() => {
    if (props.initialUrl) {
      setUploadedUrl(props.initialUrl);
    } else setUploadedUrl(null);
  }, [props.initialUrl]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    try {
      const [file] = acceptedFiles;
      const bytes = convertBytesToMbs(file?.size);
      setFileSize(bytes);
      if (bytes > UPLODABLE_IMAGE_SIZE) {
        setError(imageUploadMessages.fileSizeError);
        return;
      }

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => {
        setError(imageUploadMessages.imageUploadError);
      };
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsArrayBuffer(file);
      setUrl(URL.createObjectURL(file));
      setFileName(`${uuidv4()}-${file.name}`);
      setError(null);
      setShowCrop(true);
    } catch (ex) {
      console.log(ex);
      setError(imageUploadMessages.imageUploadError);
    }
  }, []);

  const setUploadUrl = (url: string | null) => {
    setUploadedUrl(url);
    props.setUploadUrl(url);
  };

  const updateCropped = (crop: ReactCrop.Crop) => {
    setCompletedCrop(crop);
  };

  const selectedRatio = useMemo(() => {
    return getRatioByTitle(
      props.lockedRatio ? props.lockedRatio : props.defaultSelectedRatio!
    );
  }, [props.defaultSelectedRatio, props.lockedRatio]);

  return (
    <>
      <Row justify="start" align="top" gutter={12}>
        <Col span={18}>
          <BJDrop
            fileSize={fileSize}
            error={error}
            disabled={props.disabled}
            onDrop={onDrop}
            accept={props.accept ?? ["image/*"]}
          />
          {props.extra && (
            <Typography.Paragraph type="warning">
              {props.extra}
            </Typography.Paragraph>
          )}
        </Col>
        <Col span={6}>
          {uploadedUrl && (
            <ImagePresenter
              disabled={props.disabled}
              cropped={completedCrop}
              imageUrl={uploadedUrl}
              onRemove={() => setUploadUrl(null)}
            />
          )}
        </Col>
      </Row>

      <CropAndUpload
        croppable={props.croppable}
        title={props.title}
        fileName={fileName!}
        fileSize={fileSize!}
        setUploadUrl={setUploadUrl}
        url={url}
        updateCropped={updateCropped}
        imgSrc={imgSrc!}
        uploadImage={props.uploadImage}
        lockedRatio={selectedRatio}
        defaultRatio={selectedRatio}
        defaultCropBoxWidth={props.defaultCropBoxWidth}
        defaultCropBoxHeight={props.defaultCropBoxHeight}
        allowNaturalImageUpload={props.allowNaturalImageUpload}
        show={showCrop}
        onHide={() => {
          setShowCrop(false);
        }}
      />
    </>
  );
}
