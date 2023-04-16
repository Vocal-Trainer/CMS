import { Form, Select, Typography } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { CSSProperties } from "react";
import { Control, Controller, Path } from "react-hook-form";
import { BJFormLabelInfo } from "../../atoms/BJInfo";

export const BJSelectFormItem = <T,>({
  error,
  message,
  label,
  required,
  control,
  fieldName,
  optionsList,
  handleChange,
  multiple,
  size,
  extra,
  defaultValue,
  disabled,
  includeEmpty,
  style,
  showInfo,
}: {
  error: boolean;
  message: string;
  label: string;
  required?: boolean;
  control: Control<T>;
  fieldName: Path<T>;
  multiple?: boolean;
  extra?: string;
  size?: SizeType;
  defaultValue?: any;
  disabled?: boolean;
  includeEmpty?: boolean;
  handleChange?: (selectedValue: string) => void;
  optionsList: {
    key: string | number;
    value: string | number;
    display: string;
  }[];
  style?: CSSProperties;
  showInfo?: boolean;
}) => {
  return (
    <Form.Item
      label={showInfo ? <BJFormLabelInfo info={extra} label={label} /> : label}
      name={fieldName}
      required={required}
      validateStatus={error && "error"}
      {...(message
        ? {
            help: (
              <Typography.Paragraph type="danger">
                {message}
              </Typography.Paragraph>
            ),
          }
        : undefined)}
      {...(extra && !showInfo
        ? {
            extra: (
              <Typography.Paragraph type="warning">
                {extra}
              </Typography.Paragraph>
            ) as JSX.Element,
          }
        : undefined)}
    >
      <Controller
        control={control}
        name={fieldName}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            style={style}
            disabled={disabled}
            size={size}
            mode={multiple ? "multiple" : undefined}
            onChange={e => {
              onChange(e);
              handleChange && handleChange(e);
            }}
            value={value as any}
          >
            {includeEmpty && <Select.Option value="">-</Select.Option>}
            {optionsList?.map(item => (
              <Select.Option value={item.value} key={item.key}>
                {item.display}
              </Select.Option>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
};
