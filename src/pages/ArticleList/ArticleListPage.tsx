import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../context";
import { BJColumnType } from "../../components/theme/molecules/BJTable";
import { Sorter } from "../../components/theme/util/sorter";
import BJList from "../../components/theme/components/BJList";

interface DataSourceType extends Article {
  key: string;
}

export const ArticleListPage = () => {
  const navigate = useNavigate();
  const { articles, loading } = useArticles();
  const [originalTable, setOriginalTable] = useState<DataSourceType[]>([]);

  useEffect(() => {
    const articleTableSource: DataSourceType[] = articles.map(article => ({
      ...article,
      key: article.id,
      category: article.category,
    }));
    setOriginalTable(articleTableSource);
  }, [articles]);

  const onClickRow = (record: DataSourceType) => {
    return {
      onClick: () => {
        navigate(record.id);
      },
    };
  };

  const handleNewArticle = () => {
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
