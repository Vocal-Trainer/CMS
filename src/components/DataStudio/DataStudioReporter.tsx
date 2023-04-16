import { BJFlex } from "../../components/styled";
import { StyledIframe } from "../../components/styled/BJCommonStyles";

export const DataStudioReporter = ({ src }: { src: string }) => {
  return (
    <BJFlex row centerJustify>
      <StyledIframe src={src} frameBorder="0" allowFullScreen />
    </BJFlex>
  );
};

export default DataStudioReporter;
