import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Modal, Select, Space, Typography } from "antd";
import BJButton, { ButtonTypes } from "./theme/atoms/Button";
import styled from "styled-components";
import Title from "antd/lib/typography/Title";
import { AspectRatio, aspectRatiosList } from "../utils";

interface imageCropProps {
  show: boolean;
  onHide: () => void;
  url: string | null;
  uploadImage: (file: Blob, fileName: string) => Promise<string>;
  setUploadUrl: (url: string) => void;
  fileName: string;
  fileSize: number;
  imgSrc: string | ArrayBuffer;
  title?: string;
  allowNaturalImageUpload?: boolean;
  lockedRatio?: CropperAspectRatio;
  defaultRatio?: CropperAspectRatio;
  defaultCropBoxWidth?: number;
  defaultCropBoxHeight?: number;
  updateCropped: (cropped: ReactCrop.Crop) => void;
  croppable?: boolean;
}

export interface CropperAspectRatio {
  ratioName: AspectRatio;
  display: string;
  aspect: number;
}

export const CropModal = ({
  show,
  onHide,
  url,
  uploadImage,
  setUploadUrl,
  fileName,
  imgSrc,
  title,
  allowNaturalImageUpload,
  lockedRatio,
  defaultRatio,
  defaultCropBoxWidth,
  updateCropped,
  croppable = true,
}: imageCropProps) => {
  const defaultAspect = defaultRatio ?? aspectRatiosList[0];
  const {
    onCropChange,
    onResetCrop,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    previewCanvasRef,
    imgRef,
    aspect,
    setAspect,
  } = useCrop(
    lockedRatio ? lockedRatio.aspect : defaultAspect.aspect,
    defaultCropBoxWidth
  );
  const [saving, setSaving] = useState(false);
  const [cropAndSaving, setCropAndSaving] = useState(false);

  const selectedAspect =
    lockedRatio ?? aspectRatiosList.find(x => x.aspect === +aspect);

  const onLoad = useCallback(
    (img: HTMLImageElement) => {
      imgRef.current = img;
    },
    [imgRef]
  );

  const handleCloseModal = () => {
    onResetCrop();
    onHide();
  };

  const handleAspectRatioSelect = (e: string | null) => {
    if (e != null) {
      setAspect(+e!);
    }
  };

  const handleCropCancel = () => {
    handleCloseModal();
  };

  const handleUploadNaturalImage = async (): Promise<void> => {
    const imageBlob = new Blob([imgSrc], { type: 'image/*"' });
    setSaving(true);
    const url = await uploadImage(imageBlob!, fileName);
    setUploadUrl(url);
    setSaving(false);
    handleCloseModal();
  };

  const isValidCrop = useCallback(() => {
    if (!crop) return false;
    return !!crop?.width && !!crop?.height;
  }, [crop]);

  const handleUploadCroppedImage = async () => {
    if (!isValidCrop() || !previewCanvasRef.current) {
      return;
    }

    previewCanvasRef.current!.toBlob(
      async blob => {
        setCropAndSaving(true);
        const url = await uploadImage(blob!, fileName);
        setUploadUrl(url);
        setCropAndSaving(false);
        handleCloseModal();
      },
      "image/*",
      1
    );
  };

  const getRatio = () => {
    return (
      <Space>
        <Typography.Text>ratio</Typography.Text>
        {lockedRatio ? (
          <span>{lockedRatio.display}</span>
        ) : (
          <Select
            defaultValue={selectedAspect!.aspect}
            disabled={!!lockedRatio}
            onChange={handleAspectRatioSelect as any}
            value={selectedAspect!.aspect}
            size="middle"
          >
            {aspectRatiosList.map(
              (aspectRatio: { display: string; aspect: number }) => (
                <Select.Option
                  value={aspectRatio.aspect}
                  key={aspectRatio.aspect}
                >
                  {aspectRatio.display.trim()}
                </Select.Option>
              )
            )}
          </Select>
        )}
      </Space>
    );
  };

  const footer = [
    getRatio(),
    <BJButton
      key="ftbcau1"
      buttonType={ButtonTypes.Secondary}
      onClick={handleCropCancel}
    >
      Cancel
    </BJButton>,
    <BJButton
      key="ftbcau2"
      buttonType={ButtonTypes.Save}
      disabled={cropAndSaving || !isValidCrop()}
      loading={cropAndSaving}
      size="middle"
      onClick={async () => {
        handleUploadCroppedImage();
      }}
    >
      Crop n&#39; Save
    </BJButton>,
  ];

  return (
    <StyledModal
      style={{ minWidth: "50%" }}
      maskClosable={false}
      title={title}
      visible={show}
      onCancel={onHide}
      footer={
        allowNaturalImageUpload
          ? [
              ...footer,
              <BJButton
                key="smcaub1"
                buttonType={ButtonTypes.Save}
                disabled={saving || !imgSrc}
                loading={saving}
                size="middle"
                onClick={async () => {
                  handleUploadNaturalImage();
                }}
              >
                Save
              </BJButton>,
            ]
          : footer
      }
    >
      <StyledDiv>
        <div>
          <ReactCrop
            src={url!}
            crop={croppable && { ...crop }}
            onImageLoaded={(img: HTMLImageElement) => {
              onLoad(img);
              setCrop({
                aspect: lockedRatio ? lockedRatio.aspect : defaultAspect.aspect,
                width: defaultCropBoxWidth,
                height: defaultCropBoxWidth,
              });
            }}
            onComplete={c => {
              setCompletedCrop(c);
              updateCropped(c);
            }}
            onChange={onCropChange}
          />
        </div>
        {croppable && (
          <>
            <Divider />
            <StyledCanvasContainer>
              <Title level={5}>Preview</Title>

              <canvas
                ref={previewCanvasRef}
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </StyledCanvasContainer>
          </>
        )}
      </StyledDiv>
    </StyledModal>
  );
};

export const useCrop = (
  defaultAspectRatio: number,
  defaultWidth = 100,
  defaultHeight = 100
) => {
  const [aspect, setAspect] = useState<number>(defaultAspectRatio);
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: defaultAspectRatio,
    width: defaultWidth,
    height: defaultHeight,
  });
  const [completedCrop, setCompletedCrop] = useState<ReactCrop.Crop | null>(
    null
  );
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const aspectAdd = aspect ? { aspect: aspect } : { height: defaultHeight };
    setCrop({ ...aspectAdd, width: defaultWidth });
  }, [aspect, defaultWidth, defaultHeight]);

  const onCropChange = (crop: ReactCrop.Crop) => {
    setCrop(crop);
  };

  const onResetCrop = () => {
    setCompletedCrop(null);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop: ReactCrop.Crop | null = completedCrop;
    const scaleX = image.naturalWidth / image?.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width! * pixelRatio;
    canvas.height = crop.height! * pixelRatio;

    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";
    ctx!.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );
  }, [completedCrop]);

  return {
    onCropChange,
    onResetCrop,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    previewCanvasRef,
    imgRef,
    aspect,
    setAspect,
  };
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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCanvasContainer = styled.div`
  text-align: center;
`;
