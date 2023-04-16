import { Table } from "antd";
import { ColumnType, TableProps } from "antd/lib/table";
import styled from "styled-components";
import { ColumnsType } from "antd/lib/table";
import { ComponentType } from "react";
import { CompareFn } from "antd/lib/table/interface";
import { Divider } from "antd";

export type BJColumnsType<T> = ColumnsType<T>;
export type BJColumnType<T> = ColumnType<T>;

export interface BJTableProps<T> extends TableProps<T> {
  recordCountSuffix?: string;
  hideRecordCount?: boolean;
}

function BJTable<T>(props: BJTableProps<T>) {
  const {
    columns,
    recordCountSuffix,
    dataSource,
    hideRecordCount,
    ...otherTableProps
  } = props;

  const sortableColumns: BJColumnsType<T> = columns!.map(
    (column: ColumnType<T>) => {
      const { sorter, dataIndex, ...otherColumnProps } = column;

      if (sorter) {
        const { compare, ...otherSorterProps } = sorter as {
          compare?: CompareFn<any> | undefined;
          multiple?: number | undefined;
        };
        const sortedColumn: ColumnType<T> = {
          ...otherColumnProps,
          dataIndex,
          sorter: {
            compare: <T,>(rowA: T, rowB: T) => {
              return compare!(
                rowA[dataIndex as keyof T],
                rowB[dataIndex as keyof T]
              );
            },
            ...otherSorterProps,
          },
        };
        return sortedColumn;
      }
      return { ...otherColumnProps, dataIndex };
    }
  );

  return (
    <>
      {!hideRecordCount && (
        <>
          <TotalDiv>
            {dataSource?.length} {recordCountSuffix}
          </TotalDiv>
          <StyledDivider />
        </>
      )}
      <StyledBJTable<ComponentType<BJTableProps<T>>>
        columns={sortableColumns}
        dataSource={dataSource}
        {...otherTableProps}
      />
    </>
  );
}

const TotalDiv = styled.div`
  margin-top: 1rem;
`;

const StyledDivider = styled(Divider)`
  margin: 0.5rem 0 0.5rem 0 !important;
`;

const StyledBJTable = styled(
  <T extends BJTableProps<T>>({
    recordCountSuffix: recordSuffix,
    dataSource,
    ...rest
  }: T) => <Table<T> dataSource={dataSource} {...rest} />
)`
  .ant-table-thead th {
    color: ${props => props.theme.button.primary};
    font-weight: bold;
    border: none !important;
  }
  .ant-table-tbody > tr:hover {
    cursor: pointer;
  }
  .ant-table-tbody > tr > td {
    color: ${props => props.theme.black};
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 0rem;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 0rem;
  }
  .ant-btn-link {
    color: ${props => props.theme.black};
  }
  .ant-pagination-item {
    background-color: ${props => props.theme.button.paging} !important;
    border-radius: 0 !important;
    margin: 0;
    width: 3rem;
  }
  .ant-pagination-item-link {
    background-color: ${props => props.theme.button.paging} !important;
    color: ${props => props.theme.button.primary} !important;
  }
  .ant-pagination-prev {
    margin-right: 0;
  }
  .ant-pagination-prev button {
    border-radius: 10% 0% 0% 10% !important;
    width: 3rem;
  }
  .ant-pagination-next button {
    border-radius: 0% 10% 10% 0% !important;
    width: 3rem;
  }
  .ant-pagination-item-active {
    background-color: ${props => props.theme.button.primary}!important;
    border-radius: 0 !important;
  }
  .ant-pagination-item-active a {
    color: ${props => props.theme.white} !important;
  }
  .ant-tooltip-inner {
    background-color: ${props => props.theme.button.paging}!important;
  }
`;

export default BJTable;
