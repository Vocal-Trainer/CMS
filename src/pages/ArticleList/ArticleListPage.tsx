import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../context";
import { BJColumnType } from "../../components/theme/molecules/BJTable";
import { Sorter } from "../../components/theme/util/sorter";
import BJList from "../../components/theme/components/BJList";
import { changeorder } from "../../routes";
import { Switch } from "antd";

interface datasourceType extends FullArticle {
  categorySw: string | undefined;
}

export const ArticleListPage = () => {
  const navigate = useNavigate();
  const { articles, loading } = useArticles();
  const [originalTable, setOriginalTable] = useState<datasourceType[]>([]);

  useEffect(() => {
    const articleTableSource: datasourceType[] = articles.map(article => ({
      ...article,
      key: article.id,
      categorySw: article.category?.translations?.sv?.title,
    }));
    setOriginalTable(articleTableSource);
  }, [articles]);

  const onClickRow = (record: datasourceType) => {
    return {
      onClick: () => {
        navigate(record.id);
      },
    };
  };

  const handleNewArticle = () => {
    navigate("new");
  };

  const columns: BJColumnType<datasourceType>[] = [
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
      dataIndex: "categorySw",
      key: "category",
      width: 1,
      ellipsis: true,
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: "Restricted",
      dataIndex: "restricted",
      key: "restricted",
      width: 0.5,
      ellipsis: true,
      sorter: {
        compare: Sorter.DEFAULT,
      },
      render: (value: boolean) => (
        <Switch checked={value} size="small" disabled />
      ),
    },
  ];

  return (
    <BJList
      loading={loading}
      onChangeOrder={() => {
        navigate(changeorder);
      }}
      filterOnlyDisplayList
      addButtonCaption={"New Article"}
      title={"Article"}
      OriginalList={originalTable}
      columns={columns}
      onClickRow={onClickRow}
      onclick={handleNewArticle}
      recordCountSuffix={"Articles"}
    />
  );
};
