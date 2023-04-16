import { useCallback, useState } from "react";
import { get } from "../utils";

type SortConfig = {
  field: string;
  direction: "ASC" | "DESC";
};

type Props = {
  defaultSort: { field: string; direction: "ASC" | "DESC" };
};

export const useSortableTable = ({ defaultSort }: Props) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSort);

  const requestSort = useCallback(
    (field: string) => {
      if (sortConfig.field === field) {
        setSortConfig({
          field: sortConfig.field,
          direction: sortConfig.direction === "ASC" ? "DESC" : "ASC",
        });
      } else {
        setSortConfig({ field, direction: "ASC" });
      }
    },
    [sortConfig]
  );

  const sort = (a: any, b: any) => {
    const { field, direction } = sortConfig;

    const fieldA = get(a, field);
    const fieldB = get(b, field);

    if (fieldA !== null && fieldB !== null) {
      if (fieldA < fieldB) {
        return direction === "ASC" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return direction === "ASC" ? 1 : -1;
      }
      return 0;
    }

    if (fieldA === null && fieldB !== null) {
      return 1;
    }

    if (fieldA !== null && fieldB === null) {
      return -1;
    }

    return 0;
  };

  return { sortConfig, requestSort, sort };
};
