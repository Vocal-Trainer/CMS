import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  Col,
  Typography,
  Select,
  Switch,
  Divider,
  List,
  Collapse,
} from "antd";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  isEqualArrays,
  valueOrNull,
  AspectRatio,
  formValidationError,
  ContentType,
  DeepLinkType,
} from "../../utils";
import { FormEdit, FormEditType } from "./../../components/FormEdit";
import { useArticle, useArticles } from "../../context";
// import { MarkdownEditor } from "../../components";
import { ArticleService } from "../../services";
import { commonErrors } from "../../language";
import { DropAndCrop } from "../../components/DropAndCrop";
import styled from "styled-components";
import BJInput from "../../components/theme/atoms/BJInput";
import BJButton, { ButtonTypes } from "../../components/theme/atoms/Button";
import { ImagesCollapse } from "../../components/ImagesCollapse";

const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

export type FormValues = {
  categoryId: string;
  verifierId: string;
  sponsorId: string;
  title: string;
  audioUrl: string | null;
  imageUrl: string | null;
  stretchedImageUrl: string | null;
  squareImageUrl: string | null;
  videoUrl: string | null;
  offerId1: string | null;
  offerId2: string | null;
  bannerImage1Url: string | null;
  bannerImage2Url: string | null;
  promoted: boolean;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  title: yup.string().required(requiredError),
  audioUrl: yup.string().nullable().url(urlError),
  imageUrl: yup.string().nullable().url(urlError),
  stretchedImageUrl: yup.string().nullable().url(urlError),
  squareImageUrl: yup.string().nullable().url(urlError),
  videoUrl: yup.string().nullable().url(urlError),
  bannerImage1Url: yup.string().nullable().url(urlError),
  bannerImage2Url: yup.string().nullable().url(urlError),
  categoryId: yup.string().required(requiredError),
});

export const ArticlePage = () => {
  const navigate = useNavigate();
  const { articles, categories } = useArticles();
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
    defaultValues: { promoted: false },
  });

  const [intro, setIntro] = useState("");
  const [body, setBody] = useState("");
  const [tagWords, setTagWords] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [changeFeaturedListOrder, setchangeFeaturedListOrder] = useState(false);

  useEffect(() => {
    if (loading || article === null) {
      return;
    }
    reset({ ...article });
    setIntro(article.intro);
    setBody(article.body);
  }, [article, loading, reset]);

  const onSubmit = async (data: FormValues) => {
    const category = categories.find(x => x.id === data.categoryId);
    const updatedArticle = {
      categoryId: data.categoryId,
      title: data.title.trim(),
      intro,
      body,
      verifierId: valueOrNull(data.verifierId),
      sponsorId: valueOrNull(data.sponsorId),
      offerId1: valueOrNull(data.offerId1),
      offerId2: valueOrNull(data.offerId2),
      imageUrl: valueOrNull(data.imageUrl),
      stretchedImageUrl: valueOrNull(data.stretchedImageUrl),
      squareImageUrl: valueOrNull(data.squareImageUrl),
      audioUrl: valueOrNull(data.audioUrl),
      videoUrl: valueOrNull(data.videoUrl),
      bannerImage1Url: valueOrNull(data.bannerImage1Url),
      bannerImage2Url: valueOrNull(data.bannerImage2Url),
      tagWords: tagWords,
    };

    if (article) {
      // await ArticleService.update(id, updatedArticle);
    } else {
      // const { id } = await ArticleService.create(updatedArticle);
      // return navigate(`../${id}`);
    }
  };

  const handleUploadedImageUrl = (url: string | null) => {
    setValue("imageUrl", url, { shouldDirty: true });
  };
  const handleUploadedStretchedImageUrl = (url: string | null) => {
    setValue("stretchedImageUrl", url, { shouldDirty: true });
  };
  const handleUploadedSquareImageUrl = (url: string | null) => {
    setValue("squareImageUrl", url, { shouldDirty: true });
  };
  const handleBannerImageUrl = (url: string | null) => {
    setValue("bannerImage1Url", url, { shouldDirty: true });
  };

  const handleBannerImageUrl2 = (url: string | null) => {
    setValue("bannerImage2Url", url, { shouldDirty: true });
  };

  const onRemove = async () => {
    if (article) {
      await ArticleService.delete(article.id);
      navigate("./..", { replace: true });
    } else {
      throw new Error("Article not found");
    }
  };

  const isDirty =
    !!Object.keys(formState.dirtyFields).length ||
    article?.intro !== intro ||
    article?.body !== body;
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
              "Stretched image 2:1": {
                title: "Stretched image 2:1",
                setUploadUrl: handleUploadedStretchedImageUrl,
                uploadImage: ArticleService.uploadArticleImage,
                initialUrl: article?.stretchedImageUrl,
                lockedRatio: AspectRatio.TwoToOne,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 1024*512",
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
            <Paragraph>Intro</Paragraph>
            {/* <MarkdownEditor name="intro" narrow initialValue={article?.intro ?? ""} onChange={setIntro} /> */}
          </ItemWrapper>

          <ItemWrapper>
            <Paragraph>Body</Paragraph>
            {/* <MarkdownEditor name="body" initialValue={article?.body ?? ""} onChange={setBody} /> */}
          </ItemWrapper>

          <Divider />
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="categoryId"
            required
            validateStatus={errors.categoryId && "error"}
            help={
              <Typography.Paragraph type="danger">
                {errors.categoryId?.message}
              </Typography.Paragraph>
            }
          >
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value} size="large">
                  <Select.Option value="">-</Select.Option>
                  {categories.map(category => (
                    <Select.Option value={category.id} key={category.id}>
                      {category.translations.sv.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Promote" key="promoted">
            <Controller
              control={control}
              name="promoted"
              render={({ field: { onChange, value } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Audio URL"
            validateStatus={errors.audioUrl && "error"}
            extra={
              <Typography.Paragraph type="danger">
                {errors.audioUrl?.message}
              </Typography.Paragraph>
            }
          >
            <Controller
              control={control}
              name="audioUrl"
              render={({ field }) => <BJInput {...field} />}
            />
          </Form.Item>
          <>
            <Paragraph>Upload video</Paragraph>
          </>
          <Form.Item
            label="Video URL"
            validateStatus={errors.videoUrl && "error"}
            extra={
              <Typography.Paragraph type="danger">
                {errors.videoUrl?.message}
              </Typography.Paragraph>
            }
          >
            <Controller
              control={control}
              name="videoUrl"
              render={({ field }) => <BJInput {...field} />}
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

const StyledSelect = styled(Select)`
  width: 12rem;
`;
