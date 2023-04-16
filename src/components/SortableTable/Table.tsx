import { Table } from "antd";

import { TableHeader } from "./TableHeader";
import { useSortableTable } from "../../hooks";

export type SortConfig = {
  field: string;
  direction: "ASC" | "DESC";
};

type Column = {
  name: string;
  label: string;
  sortable: boolean;
  width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

interface Props {
  children: ({ sort }: any) => JSX.Element[];
  columns: Column[];
  defaultSort: { field: string; direction: "ASC" | "DESC" };
}

export const SortableTable = ({ children, columns, defaultSort }: Props) => {
  const { sortConfig, sort, requestSort } = useSortableTable({ defaultSort });

  return (
    <Table>
      <thead>
        <tr className="d-flex">
          {columns.map((column, index) => (
            <TableHeader
              key={index}
              className={`col-${column.width}`}
              name={column.name}
              label={column.label}
              sortable={column.sortable}
              sortConfig={sortConfig}
              onSort={requestSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>{children({ sort })}</tbody>
    </Table>
  );
};
