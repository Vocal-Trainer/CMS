import { ReactComponent as LOGO } from "../../assets/logo-purpledark.svg";
import { Useremail, Password } from "../../assets/icons/icons";
import { useAuth } from "../../context";
import { Form, Row, Typography } from "antd";
import BJButton, { ButtonTypes } from "../../components/theme/atoms/Button";
import LoginBackground from "../../assets/login-bg.png";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import Text from "antd/lib/typography/Text";
import { useWindowSize } from "../../hooks/useWindowSize";
import BJInput from "../../components/theme/atoms/BJInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { commonErrors } from "../../language";
import { useState } from "react";
interface FormProps {
  email: string;
  password: string;
}
const { emailError, requiredError } = commonErrors;

const schema = yup.object().shape({
  email: yup.string().email(emailError).required(requiredError),
  password: yup.string().required(requiredError),
});

export const LoginPage = () => {
  const { signInWithEmail, signingIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: FormProps) => {
    setError(null);
    const validator = await signInWithEmail(email, password);
    if (!validator) {
      setError("Invalid Email or Password");
    }
  };

  const windowSize = useWindowSize();

  return (
    <MainContainer>
      <StyledLoginContainer>
        <LogoWrapper>
          <LOGO />
        </LogoWrapper>
        <FormContainer>
          <FormItemWrapper width={windowSize.width}>
            <div style={{ position: "relative" }}>
              <h1>Log in</h1>
            </div>

            <Form name="basic" onFinish={handleSubmit(onSubmit)}>
              <StyledFormItem
                name="email"
                required
                help={
                  <Typography.Paragraph type="danger">
                    {errors.email?.message}
                  </Typography.Paragraph>
                }
              >
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <BJInput
                      prefix={<Useremail />}
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  )}
                />
              </StyledFormItem>
              <StyledFormItem
                name="password"
                required
                help={
                  <Typography.Paragraph type="danger">
                    {errors.password?.message}
                  </Typography.Paragraph>
                }
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <BJInput
                      prefix={<Password />}
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  )}
                />
              </StyledFormItem>
              {error && <Text type="danger">{error}</Text>}
              <StyledRow justify="end">
                <StyledFormItem>
                  <BJButton
                    buttonType={ButtonTypes.Add}
                    rounded
                    size="large"
                    htmlType="submit"
                    disabled={signingIn}
                    loading={signingIn}
                  >
                    Login
                  </BJButton>
                </StyledFormItem>
              </StyledRow>
            </Form>
          </FormItemWrapper>
        </FormContainer>
      </StyledLoginContainer>
    </MainContainer>
  );
};

const StyledLoginContainer = styled.div`
  height: 100%;
  background-image: url(${LoginBackground});
  width: 100%;
  background-size: cover;
  background-size: 100% 85vh;
  background-repeat: no-repeat;
  overflow: hidden;
`;

interface FormItemWrapperProps {
  width: number;
}

const FormItemWrapper = styled.div<FormItemWrapperProps>`
  background-color: ${props => props.theme.white};
  padding: 6rem 6rem 2rem 6rem;
  border-radius: 5rem;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 0.375rem 0.375rem rgba(0, 0, 0, 0.23);
  width: ${props =>
    props.width <= 736 ? "90%" : props.width <= 1090 ? "60%" : "42%"};
  position: relative;
`;

const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 1rem;
  height: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 3rem 2rem 3rem;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledRow = styled(Row)`
  padding: 2rem;
`;

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-explain,
  .ant-form-item-explain-error {
    padding-left: 1rem;
  }
`;
