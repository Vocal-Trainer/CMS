import { Collapse, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { DropAndCrop } from "./DropAndCrop";
import { AspectRatio } from "../utils/ratioUtils";
import styled from "styled-components";

const { Panel } = Collapse;

interface ImageProps {
  title: string;

  config: {
    [key: string]: {
      title: string;
      setUploadUrl: (url: string) => void;
      uploadImage: (file: Blob, fileName: string) => Promise<string>;
      initialUrl?: string;
      lockedRatio: AspectRatio;
      defaultCropBoxWidth: number;
      extra?: string;
    };
  };
}

export function ImagesCollapse(props: ImageProps) {
  const { title, config } = props;

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <ImageWrapper>
        <Collapse expandIconPosition="right">
          {Object.entries(config).map(([key, value]) => (
            <Panel header={key} key={key}>
              <DropAndCrop
                title={value.title}
                setUploadUrl={value.setUploadUrl}
                uploadImage={value.uploadImage}
                initialUrl={value.initialUrl}
                lockedRatio={value.lockedRatio}
                defaultCropBoxWidth={value.defaultCropBoxWidth}
                extra={value.extra}
              />
            </Panel>
          ))}
        </Collapse>
      </ImageWrapper>
    </>
  );
}
const ImageWrapper = styled(Typography.Paragraph)`
  padding-top: 1em;
`;
