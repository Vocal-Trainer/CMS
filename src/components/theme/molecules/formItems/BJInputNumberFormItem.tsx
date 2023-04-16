import {
  Form,
  FormItemProps,
  InputNumber,
  InputNumberProps,
  InputProps,
  Typography,
} from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { valueType } from "antd/lib/statistic/utils";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import BJCopy from "../../atoms/BJCopy";
import { BJFormLabelInfo } from "../../atoms/BJInfo";

export const BJInputNumberFormItem = <T,>({
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
  size,
  maxLength,
  showInfo,
  isPercentage = false,
  isDecimal = false,
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
  max?: number;
  min?: number;
  isPercentage?: boolean;
  allowCopy?: boolean;
  isDecimal?: boolean;
} & FormItemProps<T> &
  InputProps &
  InputNumberProps) => {
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
            <InputNumber
              step={isDecimal ? "0.01" : "1"}
              formatter={value => (isPercentage ? `${value}%` : `${value}`)}
              stringMode={isPercentage}
              {...field}
              autoFocus={autoFocus}
              disabled={disabled}
              placeholder={!!placeHoder && placeHoder}
              size={size ? size : "large"}
              value={field.value as valueType}
              maxLength={maxLength}
            />
            {allowCopy && <BJCopy textToCopy={field.value as string} />}
          </span>
        )}
      />
    </Form.Item>
  );
};
