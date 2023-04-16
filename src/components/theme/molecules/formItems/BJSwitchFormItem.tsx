import { Form, Switch, Typography } from "antd";
import { SwitchSize } from "antd/lib/switch";
import { Control, Controller, Path } from "react-hook-form";

export const BJSwitchFormItem = <T,>({
  error,
  message,
  label,
  required,
  control,
  fieldName,
  disabled,
  extra,
  size,
  horizontal,
}: {
  error?: boolean;
  message?: string;
  label: string;
  required?: boolean;
  control: Control<T>;
  fieldName: Path<T>;
  autoFocus?: boolean;
  disabled?: boolean;
  extra?: string;
  placeHoder?: string;
  type?: string;
  size?: SwitchSize;
  horizontal?: boolean;
}) => {
  return (
    <Form.Item
      colon
      labelAlign={"left"}
      style={
        horizontal
          ? {
              alignItems: "baseline",
              flexDirection: "row",
              columnGap: "1rem",
              marginBottom: "0",
            }
          : {}
      }
      label={label}
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
        : {})}
      {...(extra
        ? {
            extra: (
              <Typography.Paragraph type="warning">
                {extra}
              </Typography.Paragraph>
            ),
          }
        : {})}
    >
      <Controller<T>
        control={control}
        name={fieldName}
        render={({ field: { onChange, value } }) => (
          <Switch
            size={size}
            disabled={disabled}
            onChange={onChange}
            checked={value as boolean}
          />
        )}
      />
    </Form.Item>
  );
};
