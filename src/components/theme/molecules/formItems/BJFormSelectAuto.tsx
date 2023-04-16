import { AutoComplete, Form, Input, Typography } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";

export const BJAutoFormItem = <T,>({
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
  optionsList,
  defaultValue,
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
  defaultValue?: string;
  optionsList: { key: string; value: string }[];
}) => {
  return (
    <Form.Item
      label={label}
      key="content"
      required={true}
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
        render={({ field: { onChange } }) => (
          <AutoComplete
            size="large"
            allowClear
            disabled={disabled}
            notFoundContent={"not found"}
            backfill
            defaultValue={defaultValue}
            options={optionsList}
            placeholder={`type title name to select `}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(value, option) => {
              onChange(option!.key);
            }}
            onChange={value => {
              const x = optionsList?.find(x => x.value === value);
              onChange(x?.key);
            }}
          />
        )}
      />
    </Form.Item>
  );
};
