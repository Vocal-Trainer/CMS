import { useEffect, useState } from "react";
import { Form, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { useArticles } from "../../context";
import { ArticleService } from "../../services";
import { Select } from "antd";
import { FormEdit, FormEditType } from "../../components/FormEdit";
import { CenteredSpinner } from "../../components";
import styled from "styled-components";
import { BJSortableList } from "../../components/theme/molecules/BJSortableList";
import { arrayMove } from "../../utils/moveArrayItems";

interface Props {
  onCancel?: () => void;
}

type SortProps = {
  oldIndex: number;
  newIndex: number;
};

export const ChangeOrderList = (_: Props) => {
  const {
    articles: allArticles,
    categories,
    loading: articlesLoading,
  } = useArticles();
  const { handleSubmit } = useForm();
  const [isDirty, setIsDirty] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<ArticleCategory | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    setArticles(
      allArticles
        .filter(article => article.categoryId === category?.id)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((article, index) => ({ ...article, sortOrder: index }))
    );
  }, [allArticles, category]);

  const saveOrder = async () => {
    await ArticleService.updateSortOrders(
      articles.map((item, index) => ({ ...item, sortOrder: index }))
    );
    setIsDirty(false);
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortProps) => {
    if (oldIndex === newIndex) {
      return;
    }
    const sortableArticles = arrayMove([...articles], oldIndex, newIndex);
    setArticles(sortableArticles);
    setIsDirty(true);
  };

  if (articlesLoading) return <CenteredSpinner />;

  return (
    <FormEdit
      enableSave={isDirty}
      title={"Change articles order"}
      editType={FormEditType.VIEW}
      loading={articlesLoading}
      onSubmit={handleSubmit(saveOrder)}
    >
      <Row>
        <Col>
          <Form.Item className="d-inline-block">
            <StyledSelect
              style={{ width: "12rem" }}
              defaultValue={
                categories.length > 0 ? categories[0].translations.sv.title : ""
              }
              size="large"
              onChange={e => {
                const category = categories.find(c => c.id === e);
                if (category) {
                  setCategory(category);
                }
              }}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.translations.sv.title}
                </option>
              ))}
            </StyledSelect>
          </Form.Item>
        </Col>
      </Row>
      <BJSortableList items={articles} onSortEnd={onSortEnd} />
    </FormEdit>
  );
};

const StyledSelect = styled(Select)`
  width: 2rem;
`;
