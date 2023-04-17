import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Typography, Select, Divider, DatePicker } from "antd";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AspectRatio, formValidationError, valueOrNull } from "../../utils";
import { FormEdit, FormEditType, MarkdownEditor } from "./../../components";
import { useArticle, useArticles } from "../../context";
import { ArticleService } from "../../services";
import { commonErrors } from "../../language";
import styled from "styled-components";
import BJInput from "../../components/theme/atoms/BJInput";
import { ImagesCollapse } from "../../components/ImagesCollapse";

const { Paragraph } = Typography;

export type FormValues = {
  category: string;
  title: string;
  imageUrl: string | null;
  stretchedImageUrl: string | null;
  squareImageUrl: string | null;
  content: string;
  shortDescription: string;
  source: string;
  author: string;
  publishedDate: string;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  title: yup.string().required(requiredError),
  imageUrl: yup.string().nullable().url(urlError),
  stretchedImageUrl: yup.string().nullable().url(urlError),
  squareImageUrl: yup.string().nullable().url(urlError),
  category: yup.string().required(requiredError),
  content: yup.string().required(requiredError),
  shortDescription: yup.string().required(requiredError),
});

export const ArticlePage = () => {
  const navigate = useNavigate();
  const { categories } = useArticles();
  const { id } = useParams<string>();
  const { article, loading } = useArticle(id);

  const {
    formState,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (loading || article === null) {
      return;
    }
    reset({ ...article });
  }, [article, loading, reset]);

  const onSubmit = async (data: FormValues) => {
    const updatedArticle: Partial<Article> = {
      category: data.category,
      title: data.title.trim(),
      shortDescription: data.shortDescription,
      content: data.content,
      imageUrl: valueOrNull(data.imageUrl),
      squareImageUrl: valueOrNull(data.squareImageUrl),
      source: valueOrNull(data.source),
      author: valueOrNull(data.author),
      publishedDate: valueOrNull(data.publishedDate),
    };

    if (article) {
      await ArticleService.update(id, updatedArticle);
    } else {
      const { id } = await ArticleService.create(updatedArticle);
      return navigate(`../${id}`);
    }
  };

  const handleUploadedImageUrl = (url: string | null) => {
    setValue("imageUrl", url, { shouldDirty: true });
  };

  const handleUploadedSquareImageUrl = (url: string | null) => {
    setValue("squareImageUrl", url, { shouldDirty: true });
  };

  const onRemove = async () => {
    if (article) {
      await ArticleService.delete(article.id);
      navigate("./..", { replace: true });
    } else {
      throw new Error("Article not found");
    }
  };

  const isDirty = !!Object.keys(formState.dirtyFields).length;
  const articleTitle = watch("title");

  return (
    <FormEdit
      onRemove={onRemove}
      hasValidationErrors={Object.keys(errors).length !== 0}
      enableSave={isDirty}
      title={article ? article?.title : "New Article"}
      id={article?.id}
      editType={article?.id ? FormEditType.EDIT : FormEditType.ADD}
      loading={loading}
      onSubmit={handleSubmit(onSubmit, formValidationError)}
      recordIdentifier={articleTitle}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Title"
            validateStatus={errors.title && "error"}
            extra={
              <Typography.Paragraph type="danger">
                {errors.title?.message}
              </Typography.Paragraph>
            }
            required
          >
            <Controller
              control={control}
              name="title"
              render={({ field }) => <BJInput {...field} />}
            />
          </Form.Item>
          <ImagesCollapse
            title="Image URL"
            config={{
              "Cover image 4:3": {
                title: "Cover image 4:3",
                setUploadUrl: handleUploadedImageUrl,
                uploadImage: ArticleService.uploadArticleImage,
                initialUrl: article?.imageUrl,
                lockedRatio: AspectRatio.FourToThree,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 1280*960",
              },
              "Square image 1:1": {
                title: "Square image 1:1",
                setUploadUrl: handleUploadedSquareImageUrl,
                uploadImage: ArticleService.uploadArticleImage,
                initialUrl: article?.squareImageUrl,
                lockedRatio: AspectRatio.OneToOne,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 512*512",
              },
            }}
          />

          <ItemWrapper>
            <Paragraph>Short Description</Paragraph>
            <MarkdownEditor
              name="body"
              initialValue={article?.shortDescription ?? ""}
              onChange={v =>
                setValue("shortDescription", v, { shouldDirty: true })
              }
            />
          </ItemWrapper>

          <ItemWrapper>
            <Paragraph>Body</Paragraph>
            <MarkdownEditor
              name="body"
              initialValue={article?.content ?? ""}
              onChange={v => setValue("content", v, { shouldDirty: true })}
            />
          </ItemWrapper>

          <Divider />
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category"
            required
            validateStatus={errors.category && "error"}
            help={
              <Typography.Paragraph type="danger">
                {errors.category?.message}
              </Typography.Paragraph>
            }
          >
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value} size="large">
                  <Select.Option value="">-</Select.Option>
                  {categories.map(category => (
                    <Select.Option value={category} key={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Source URL"
            validateStatus={errors.source && "error"}
            extra={
              <Typography.Paragraph type="danger">
                {errors.source?.message}
              </Typography.Paragraph>
            }
          >
            <Controller
              control={control}
              name="source"
              render={({ field }) => <BJInput {...field} />}
            />
          </Form.Item>
          <Form.Item label="Publish date">
            <Controller
              name="publishedDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  placeholder={article?.publishedDate ?? "Select date"}
                  format={"YYYY-MM-DD"}
                  onChange={onChange}
                  size={"large"}
                />
              )}
            />
          </Form.Item>
        </Col>
      </Row>
    </FormEdit>
  );
};

const ItemWrapper = styled.div`
  padding-top: 2rem;
`;
