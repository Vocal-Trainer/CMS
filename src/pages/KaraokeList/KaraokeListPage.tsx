import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKaraokes } from "../../context";
import { BJColumnType } from "../../components/theme/molecules/BJTable";
import { Sorter } from "../../components/theme/util/sorter";
import BJList from "../../components/theme/components/BJList";

interface DataSourceType extends Karaoke {
  key: string;
}

export const KaraokeListPage = () => {
  const navigate = useNavigate();
  const { karaokes, loading } = useKaraokes();
  const [originalTable, setOriginalTable] = useState<DataSourceType[]>([]);

  useEffect(() => {
    const _tableSource: DataSourceType[] = karaokes.map(_k => ({
      ..._k,
      key: _k.id,
    }));
    setOriginalTable(_tableSource);
  }, [karaokes]);

  const onClickRow = (record: DataSourceType) => {
    return {
      onClick: () => {
        navigate(record.id);
      },
    };
  };

  const handleNewKaraoke = () => {
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
      title: "Category",
      dataIndex: "category",
      key: "category",
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
      addButtonCaption={"New Karaoke"}
      title={"Karaoke"}
      OriginalList={originalTable}
      columns={columns}
      onClickRow={onClickRow}
      onclick={handleNewKaraoke}
      recordCountSuffix={"Karaoke"}
    />
  );
};
