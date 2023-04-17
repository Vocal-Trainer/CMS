import { DatePicker, Form, FormItemProps, InputProps, Typography } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import BJCopy from "../../atoms/BJCopy";
import { BJFormLabelInfo } from "../../atoms/BJInfo";

export const BJDateInputItem = <T,>({
  error,
  message,
  label,
  required,
  control,
  fieldName,
  extra,
  placeHolder,
  showInfo,
  allowCopy = false,
  format = "YYYY-MM-DD",
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
  placeHolder?: string;
  type?: string;
  size?: SizeType;
  showInfo?: boolean;
  autoComplete?: string;
  allowCopy?: boolean;
  format?: string;
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
            <DatePicker
              {...field}
              placeholder={placeHolder}
              format={format}
              size={"large"}
            />
            {allowCopy && <BJCopy textToCopy={field.value as string} />}
          </span>
        )}
      />
    </Form.Item>
  );
};
