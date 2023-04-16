import React, { FC } from "react";
import styled from "styled-components";

interface BJImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: string;
}

const BJImage: FC<BJImageProps> = props => <StyledImage {...props} />;

const StyledImage = styled.img<BJImageProps>`
  width: ${props => props.width ?? "1rem"};
  height: ${props => props.height ?? "1rem"};
  border-radius: ${props => props.borderRadius ?? "0rem"};
`;

export default BJImage;
