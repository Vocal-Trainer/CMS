import { Switch, Row, Typography } from "antd";
import { useState, useEffect } from "react";
import { BJFilterSelect } from "./theme/atoms/BJFilterSelect";
interface Props {
  label: string;
  placeholder?: string;
  filter: IFilter;
  onPressItem: (value: string) => void;
  onCheckAll: (allChecked: boolean) => void;
}

export const FilterButton = ({
  label,
  filter,
  onPressItem,
  onCheckAll,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<any>([]);

  const selectAll = (checked: boolean) =>
    checked
      ? (setSelectedValue(filter.data.map(item => item.text)),
        onCheckAll(checked))
      : (setSelectedValue([]), onCheckAll(checked));

  useEffect(() => {
    if (filter.selected.size === 0) {
      setSelectedValue([]);
    }
  }, [filter.selected.size]);

  return (
    <BJFilterSelect
      size="large"
      mode="multiple"
      bordered={false}
      showSearch
      maxTagCount={2}
      showArrow
      options={filter.data.map(item => ({
        value: item.text,
        key: item.value,
      }))}
      dropdownRender={menu => (
        <div>
          <Row justify="space-around" align="middle">
            <Typography.Paragraph>Select All</Typography.Paragraph>
            <Switch onChange={selectAll} size="small" />
          </Row>
          {menu}
        </div>
      )}
      onSelect={(value, option) => onPressItem(option.key! as string)}
      onDeselect={(value, option) => onPressItem(option.key! as string)}
      onChange={value => setSelectedValue(value)}
      value={selectedValue}
      placeholder={label}
    />
  );
};
