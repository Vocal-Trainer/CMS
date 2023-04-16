import { Form, FormItemProps, Input, InputProps, Typography } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import BJCopy from "../../atoms/BJCopy";
import { BJFormLabelInfo } from "../../atoms/BJInfo";

export const BJInputFormItem = <T,>({
  error,
  message,
  label,
  required,
  control,
  fieldName,
  autoFocus,
  disabled,
  extra,
  placeHoder,
  type,
  size,
  autoComplete,
  suffix,
  maxLength,
  rows,
  showInfo,
  allowCopy = false,
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
  size?: SizeType;
  showInfo?: boolean;
  autoComplete?: string;
  allowCopy?: boolean;
  rows?: number;
} & FormItemProps<T> &
  InputProps) => {
  return (
    <Form.Item
      label={showInfo ? <BJFormLabelInfo info={extra} label={label} /> : label}
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
      <Controller<T>
        control={control}
        name={fieldName}
        render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
          <span style={{ display: "flex", alignItems: "center" }}>
            {rows ? (
              <Input.TextArea
                {...field}
                rows={rows}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                disabled={disabled}
                placeholder={!!placeHoder && placeHoder}
                size={size ? size : "large"}
                value={field.value as string | number | readonly string[]}
                maxLength={maxLength}
              />
            ) : (
              <Input
                {...field}
                autoFocus={autoFocus}
                disabled={disabled}
                placeholder={!!placeHoder && placeHoder}
                size={size ? size : "large"}
                value={field.value as string | number | readonly string[]}
                type={type === "password" ? "password" : "text"}
                suffix={suffix}
                maxLength={maxLength}
              />
            )}
            {allowCopy && <BJCopy textToCopy={field.value as string} />}
          </span>
        )}
      />
    </Form.Item>
  );
};
