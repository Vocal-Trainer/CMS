import { Form, Typography } from "antd";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import { MarkdownEditor } from "../../..";

export const BJMdFormItem = <T,>({
  error,
  message,
  label,
  required,
  control,
  fieldName,
  extra,
  setValue,
  disabled,
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
  setValue: any;
}) => {
  return (
    <Form.Item
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
      <Controller<T>
        control={control}
        name={fieldName}
        render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
          <MarkdownEditor
            disabled={disabled}
            name={fieldName}
            initialValue={field.value as string}
            onChange={function (value: string): void {
              setValue(field.name, value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        )}
      />
    </Form.Item>
  );
};
