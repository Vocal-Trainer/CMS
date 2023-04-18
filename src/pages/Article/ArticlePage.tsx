import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Divider } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AspectRatio, formValidationError, valueOrNull } from "../../utils";
import { FormEdit, FormEditType } from "./../../components";
import { useArticle, useArticles } from "../../context";
import { ArticleService } from "../../services";
import { commonErrors } from "../../language";
import { ImagesCollapse } from "../../components/ImagesCollapse";
import { BJMdFormItem } from "../../components/theme/molecules/formItems/BJFormMarkdown";
import {
  BJDateInputItem,
  BJInputFormItem,
  BJSelectFormItem,
} from "../../components/theme";

export type FormValues = {
  category: string;
  title: string;
  imageUrl: string | null;
  squareImageUrl: string | null;
  content: string;
  shortDescription: string;
  source: string;
  author: string;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  title: yup.string().required(requiredError),
  imageUrl: yup.string().nullable().url(urlError),
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
      publishedDate: new Date().toISOString(),
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
          <BJInputFormItem
            control={control}
            error={!!errors?.title}
            label={"Title"}
            message={errors.title?.message}
            required={true}
            autoFocus
            fieldName={"title"}
          />
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
        </Col>

        <Col span={12}>
          <BJSelectFormItem
            size="large"
            control={control}
            required={true}
            error={!!errors.category}
            label={"Category"}
            message={errors.category?.message}
            optionsList={categories.map(_c => ({
              key: _c,
              value: _c,
              display: _c,
            }))}
            fieldName={"category"}
          />
          <BJInputFormItem
            control={control}
            error={!!errors.source}
            label={"source"}
            message={errors.source?.message}
            fieldName={"source"}
            required={false}
          />
        </Col>
      </Row>

      <Divider />
      <BJMdFormItem
        disabled={false}
        setValue={setValue}
        control={control}
        error={!!errors.shortDescription}
        label={"Short Description"}
        message={errors.shortDescription?.message}
        required={true}
        fieldName={"shortDescription"}
      />

      <Divider />
      <BJMdFormItem
        disabled={false}
        setValue={setValue}
        control={control}
        error={!!errors.content}
        label={"Content"}
        message={errors.content?.message}
        required={true}
        fieldName={"content"}
      />
    </FormEdit>
  );
};
