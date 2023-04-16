import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BJButton, { ButtonTypes } from "./theme/atoms/Button";

interface Props {
  label?: string;
  routePath?: string;
}

export const BackButton = ({ label = "Go back", routePath }: Props) => {
  const navigate = useNavigate();

  return (
    <BJButton
      buttonType={ButtonTypes.Secondary}
      icon={<FaArrowLeft />}
      onClick={() => (routePath ? navigate(routePath) : navigate(-1))}
      size="large"
    >
      {label ?? "Go Back"}
    </BJButton>
  );
};
