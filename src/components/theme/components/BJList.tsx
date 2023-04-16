import BJButton, { ButtonTypes } from "../atoms/Button";
import BJTable, { BJColumnType } from "../molecules/BJTable";
import { useCallback, useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import BJTableHeader from "../molecules/TableHeader";
import { useTheme } from "styled-components";
import { TableRowSelection } from "antd/lib/table/interface";
import { useApplicationCommonContext } from "../../../context";
import { genereteTableKey } from "../helpers/helper";

interface BJListProps<T> {
  keyWord?: string;
  addButtonCaption?: string;
  hidePrefix?: boolean;
  hideSearch?: boolean;
  title?: string;
  recordCountSuffix?: string;
  loading?: boolean;
  onChangeOrder?: () => void;
  onclick?: () => void;
  rowSelection?: TableRowSelection<T>;
  onClickRow?: (record: T) => {
    onClick: () => void;
  };
  OriginalList: T[];
  columns: BJColumnType<T>[];
  filterOnlyDisplayList?: boolean;
  showSizeChanger?: boolean;
  defaultPageSize?: number;
  filters?: JSX.Element;
  prefix?: JSX.Element;
  extra?: JSX.Element;
  scrollX?: number;
}

const BJList = <T,>({
  keyWord,
  addButtonCaption: addButtonName,
  title,
  onclick,
  OriginalList,
  loading,
  onClickRow,
  columns,
  filterOnlyDisplayList,
  recordCountSuffix,
  hidePrefix,
  onChangeOrder,
  rowSelection,
  defaultPageSize,
  showSizeChanger,
  filters,
  prefix,
  hideSearch,
  extra,
  scrollX: scrollX,
}: BJListProps<T>) => {
  const theme = useTheme();
  const { tableSearchQuery = {}, setTableSearchQuery } =
    useApplicationCommonContext();
  const [filteredList, setFilteredList] = useState<T[]>([]);
  const tableKey = genereteTableKey(title || keyWord);
  const searchQuery = (tableSearchQuery || {})[tableKey] || "";

  const containsValue = useCallback(
    (value: T[keyof T]) => {
      if (typeof value === "number") {
        return (+value)
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    },
    [searchQuery]
  );

  useEffect(() => {
    if (searchQuery) {
      const filtered = OriginalList.filter(o =>
        Object.keys(o).some(k => {
          const value = o[k as keyof T];
          return filterOnlyDisplayList
            ? columns.map(x => x.dataIndex).includes(k) && containsValue(value)
            : containsValue(value);
        })
      );
      setFilteredList(filtered);
    }
  }, [
    searchQuery,
    OriginalList,
    columns,
    filterOnlyDisplayList,
    containsValue,
  ]);

  return (
    <>
      <BJTableHeader
        hideSearch={hideSearch}
        prefixButton={
          !hidePrefix ? (
            prefix ? (
              prefix
            ) : (
              <BJButton
                buttonType={ButtonTypes.Add}
                icon={
                  <BsPlusCircleFill
                    size={"1rem"}
                    color={theme.button.primary}
                  />
                }
                size="large"
                onClick={onclick!}
              >
                {addButtonName}
              </BJButton>
            )
          ) : undefined
        }
        inputPlaceholder={`Sök bland ${OriginalList?.length} ${recordCountSuffix}...`}
        title={title}
        create={false}
        value={searchQuery}
        onChangeInput={e => {
          setTableSearchQuery({
            ...tableSearchQuery,
            [tableKey]: e.target.value,
          });
        }}
        suffixButton={
          onChangeOrder &&
          OriginalList?.length > 1 && (
            <BJButton onClick={onChangeOrder!}>Change order</BJButton>
          )
        }
      />
      {filters && filters}
      {extra && extra}
      <BJTable
        loading={loading}
        scroll={{ x: scrollX }}
        pagination={
          defaultPageSize || showSizeChanger
            ? {
                defaultPageSize: defaultPageSize,
                showSizeChanger: showSizeChanger,
              }
            : undefined
        }
        rowSelection={rowSelection}
        columns={columns}
        dataSource={searchQuery ? filteredList : OriginalList}
        onRow={onClickRow}
        recordCountSuffix={recordCountSuffix}
      />
    </>
  );
};

export default BJList;
