import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled, { css } from "styled-components";

import { SortConfig } from "./Table";

type SortableTableHeaderProps = {
  className?: string;
  name: string;
  label: string;
  sortable: boolean;
  sortConfig: SortConfig;
  onSort: (fieldName: string) => void;
};

export const TableHeader = ({
  className,
  name,
  label,
  sortable,
  sortConfig,
  onSort,
}: SortableTableHeaderProps) => (
  <Th sortable={sortable} className={className} onClick={() => onSort(name)}>
    <span>{label}</span>
    {sortable ? (
      sortConfig.field === name && sortConfig.direction === "ASC" ? (
        <FaChevronDown className="ml-2" size={14} />
      ) : (
        <FaChevronUp className="ml-2" size={14} />
      )
    ) : null}
  </Th>
);

const Th = styled("th")<{ sortable: boolean }>`
  ${props =>
    props.sortable &&
    css`
      cursor: pointer;
    `}
`;
