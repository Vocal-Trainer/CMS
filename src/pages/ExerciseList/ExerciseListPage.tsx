import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExercises } from "../../context";
import { BJColumnType } from "../../components/theme/molecules/BJTable";
import { Sorter } from "../../components/theme/util/sorter";
import BJList from "../../components/theme/components/BJList";

interface DataSourceType extends Exercise {
  key: string;
}

export const ExerciseListPage = () => {
  const navigate = useNavigate();
  const { exercises, loading } = useExercises();
  const [originalTable, setOriginalTable] = useState<DataSourceType[]>([]);

  useEffect(() => {
    const _tableSource: DataSourceType[] = exercises.map(_e => ({
      ..._e,
      key: _e.id,
    }));
    setOriginalTable(_tableSource);
  }, [exercises]);

  const onClickRow = (record: DataSourceType) => {
    return {
      onClick: () => {
        navigate(record.id);
      },
    };
  };

  const handleNewExercise = () => {
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
      title: "day",
      dataIndex: "day",
      key: "day",
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
      addButtonCaption={"New Exercise"}
      title={"Exercise"}
      OriginalList={originalTable}
      columns={columns}
      onClickRow={onClickRow}
      onclick={handleNewExercise}
      recordCountSuffix={"Exercise"}
    />
  );
};
