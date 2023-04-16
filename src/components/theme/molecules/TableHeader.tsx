import { Row, Col, Space, Typography, SelectProps } from "antd";
import React, { FC } from "react";
import BJInput from "../atoms/BJInput";
import BJSelect from "../atoms/BJSelect";
import { IoIosSearch } from "react-icons/io";
import styled, { useTheme } from "styled-components";
import Layout from "antd/lib/layout/layout";

const BJTableHeader: FC<BJTableHeaderProps> = ({
  title,
  create,
  createOptions,
  createPlaceholder,
  inputPlaceholder,
  suffixButton,
  prefixButton,
  onChangeInput,
  hideSearch,
  value,
}) => {
  const theme = useTheme();

  return (
    <Layout>
      <StyledSpace direction="vertical">
        <Row align="middle" gutter={[16, 16]}>
          {title && (
            <Col>
              <Row justify="start" align="middle">
                <StyledTitle level={3}>{title ?? "Title"}</StyledTitle>
              </Row>
            </Col>
          )}
          <Col>
            <Row justify="start">
              {create ? (
                <BJSelect
                  options={createOptions ?? []}
                  placeholder={createPlaceholder ?? "N/A"}
                  size="large"
                />
              ) : prefixButton ? (
                prefixButton
              ) : null}
            </Row>
          </Col>
          <Col flex={1}>
            <Row justify="end">{suffixButton && suffixButton}</Row>
          </Col>
        </Row>
        {!hideSearch && (
          <Row>
            <BJInput
              value={value}
              BJDefault
              placeholder={inputPlaceholder ?? "Enter..."}
              size="small"
              onChange={onChangeInput}
              prefix={<IoIosSearch color={theme.icon.gray} size={"1.5rem"} />}
            />
          </Row>
        )}
      </StyledSpace>
    </Layout>
  );
};

type OptionsProps = SelectProps<any>["options"];
interface BJTableHeaderProps {
  title?: string;
  create: boolean;
  createPlaceholder?: string;
  createOptions?: OptionsProps;
  prefixButton?: JSX.Element;
  suffixButton?: JSX.Element;
  inputPlaceholder?: string;
  hideSearch?: boolean;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const StyledTitle = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0rem !important;
  }
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

export default BJTableHeader;
