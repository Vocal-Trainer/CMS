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
}) => {
  return (
    <Form.Item
      label={label}
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
      {...(extra
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
        render={({ field: { onChange, value } }) => (
          <Switch
            size={size}
            onChange={onChange}
            checked={value as boolean}
            disabled={disabled}
          />
        )}
      />
    </Form.Item>
  );
};
