import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BJColumnType } from "../../components/theme/molecules/BJTable";
import { Sorter } from "../../components/theme/util/sorter";
import BJList from "../../components/theme/components/BJList";
import { useCompetitions } from "../../context/CompetitionContext";

interface DataSourceType extends Competition {
  key: string;
}

export const CompetitionListPage = () => {
  const navigate = useNavigate();
  const { competitions, loading } = useCompetitions();
  const [originalTable, setOriginalTable] = useState<DataSourceType[]>([]);

  useEffect(() => {
    const _tableSource: DataSourceType[] = competitions.map(_e => ({
      ..._e,
      key: _e.id,
    }));
    setOriginalTable(_tableSource);
  }, [competitions]);

  const onClickRow = (record: DataSourceType) => {
    return {
      onClick: () => {
        navigate(record.id);
      },
    };
  };

  const handleNewCompetition = () => {
    navigate("new");
  };

  const columns: BJColumnType<DataSourceType>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 2,
      ellipsis: true,
      onFilter: (value, record) => record.title.includes(value as string),
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      width: 1,
      ellipsis: true,
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
  ];

  return (
    <BJList
      loading={loading}
      filterOnlyDisplayList
      addButtonCaption={"New Competition"}
      title={"Competition"}
      OriginalList={originalTable}
      columns={columns}
      onClickRow={onClickRow}
      onclick={handleNewCompetition}
      recordCountSuffix={"Competitions"}
    />
  );
};
