import { useEffect, useState } from "react";
import { useArticles } from "../../../context";
import { ArticleCategoryModal } from "./ArticleCategoryModal";
import BJList from "../../../components/theme/components/BJList";
import { BJColumnsType } from "../../../components/theme/molecules/BJTable";
import { Sorter } from "../../../components/theme/util/sorter";
import { Switch } from "antd";

interface datasourceType extends ArticleCategory {
  categorySw: string | undefined;
  categoryEn: string | undefined;
}

export const ArticleCategoryList = () => {
  const { categories } = useArticles();
  const [originalTable, setOriginalTable] = useState<datasourceType[]>([]);

  useEffect(() => {
    const categoryTableSource: datasourceType[] = categories.map(category => ({
      ...category,
      key: category.id,
      categoryEn: category.translations.en.title,
      categorySw: category.translations.sv.title,
    }));
    setOriginalTable(categoryTableSource);
  }, [categories]);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory | null>(null);

  const columns: BJColumnsType<datasourceType> = [
    {
      title: "Name (Sv)",
      dataIndex: "categorySw",
      key: "category",
      width: 1,
      ellipsis: true,
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: "Name (En)",
      dataIndex: "categoryEn",
      key: "title",
      width: 2,
      ellipsis: true,
      onFilter: (value, record) => record.id.includes(value as string),
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
    {
      title: "Visible",
      dataIndex: "show",
      key: "show",
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

  const onClickRow = (record: datasourceType) => {
    return {
      onClick: () => {
        setSelectedCategory(record);
      },
    };
  };

  useEffect(() => {
    if (selectedCategory) {
      setShowAddCategoryModal(true);
    }
  }, [selectedCategory]);

  return (
    <>
      <BJList
        addButtonCaption={"New category"}
        title={"Categories"}
        OriginalList={originalTable}
        columns={columns}
        recordCountSuffix={"Categories"}
        onClickRow={onClickRow}
        onclick={() => {
          setShowAddCategoryModal(true);
        }}
      />
      <ArticleCategoryModal
        show={showAddCategoryModal}
        onHide={() => {
          setShowAddCategoryModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />
    </>
  );
};
