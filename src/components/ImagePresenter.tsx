import { Button } from "antd";
import styled from "styled-components";

interface Props {
  imageUrl: string;
  width?: string;
  hideBorder?: boolean;
  onRemove?: () => void;
  cropped?: ReactCrop.Crop;
  disabled?: boolean;
}

export const ImagePresenter = ({
  imageUrl,
  hideBorder,
  width,
  onRemove,
  disabled,
}: Props) => {
  return (
    <>
      <ImagePlaceholder hideBorder={hideBorder} width={width}>
        <a href={imageUrl} target="_blank" rel="noreferrer">
          <img src={imageUrl} alt="loading..." />
        </a>
      </ImagePlaceholder>
      {onRemove && !disabled && (
        <StyledRemove>
          <Button type="link" onClick={onRemove}>
            Remove
          </Button>
        </StyledRemove>
      )}
    </>
  );
};
const ImagePlaceholder = styled.div<{
  hideBorder: boolean;
  width?: string;
}>`
  border: ${props => (props.hideBorder ? "none" : "0.125rem dashed #ced4da")};
  width: ${props => (props.width ? props.width : "100%")};
  img {
    max-width: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const StyledRemove = styled.div`
  text-align: center;
`;
