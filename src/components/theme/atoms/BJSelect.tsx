import Select, { SelectProps } from "antd/lib/select";
import React, { FC, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

const BJSelect: FC<SelectProps<any>> = ({
  suffixIcon,
  placeholder,
  options,
  defaultValue,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  type OptionsProps = typeof options;

  const opt = placeholder
    ? options?.concat({
        label: placeholder,
        value: "placeholder",
        style: { display: "none" },
      })
    : options;

  const getMax = (options: OptionsProps): number =>
    Math.max(
      ...(options?.map(item => item.label?.toString().length ?? 0) || [])
    );

  const setDropDownWidth = (): number =>
    getMax(options) > 20 ? getMax(options) * 10 + 20 : 200;

  return (
    <StyledSelect
      theme={theme}
      bordered={false}
      suffixIcon={
        suffixIcon ? (
          <div>{suffixIcon}</div>
        ) : (
          <div>
            <FaPlusCircle size={"1rem"} color={theme.button.primary} />
          </div>
        )
      }
      dropdownRender={menu => <StyledDropdown>{menu}</StyledDropdown>}
      dropdownStyle={AntdStyles.dropdownStyle}
      dropdownAlign={{ offset: [0, 0] }}
      options={opt}
      defaultValue={placeholder ? "placeholder" : defaultValue}
      dropdownMatchSelectWidth={setDropDownWidth()}
      {...props}
    />
  );
};

const StyledSelect = styled(Select)`
  background-color: ${props => props?.theme?.primary};
  color: ${props => props?.theme?.text?.primary};
  border-radius: 0.938rem;
  .ant-select-selection-item {
    margin-left: 1.2rem;
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  &.ant-select-open {
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }

  .ant-select-arrow {
    left: 1rem;
    height: 100%;
    top: 0;
    margin-top: 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDropdown = styled.div`
  background-color: ${props => props.theme.primary};
  border-bottom-left-radius: 0.938rem;
  border-bottom-right-radius: 0.938rem;
  border-top-right-radius: 0.938rem;
  border-top-left-radius: 0rem;
  .ant-select-item-option-content {
    padding-left: 1rem;
  }
  &.ant-select-item-option,
  .ant-select-item-option-active {
    background-color: ${props => props.theme.active.background};
  }
  .ant-select-item-option-selected {
    background-color: ${props => props.theme.active.background};
  }
`;
interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const AntdStyles: StyleSheet = {
  dropdownStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 0,
    boxShadow: "none",
  },
};
export default BJSelect;
