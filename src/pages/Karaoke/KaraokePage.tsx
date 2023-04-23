import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Divider } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AspectRatio, formValidationError, valueOrNull } from "../../utils";
import { FormEdit, FormEditType } from "./../../components";
import { useKaraoke, useKaraokes } from "../../context";
import { KaraokeService } from "../../services";
import { commonErrors } from "../../language";
import { ImagesCollapse } from "../../components/ImagesCollapse";
import { BJInputFormItem, BJSelectFormItem } from "../../components/theme";

type FormValues = {
  category: string;
  title: string;
  imageUrl: string | null;
  source: string;
  author: string;
  difficulty: string;
  lyrics: string;
  pitchData: string;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  category: yup.string().required(requiredError),
  title: yup.string().required(requiredError),
  imageUrl: yup.string().nullable().url(urlError),
  author: yup.string().required(requiredError),
  difficulty: yup.string().required(requiredError),
  lyrics: yup.string().required(requiredError),
  pitchData: yup.string().required(requiredError),
});

export const KaraokePage = () => {
  const navigate = useNavigate();
  const { categories, difficulty } = useKaraokes();
  const { id } = useParams<string>();
  const { karaoke, loading } = useKaraoke(id);

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
    if (loading || karaoke === null) {
      return;
    }
    reset({ ...karaoke });
  }, [karaoke, loading, reset]);

  const onSubmit = async (data: FormValues) => {
    const updated: Partial<Karaoke> = {
      category: data.category,
      title: data.title.trim(),
      difficulty: data.difficulty,
      author: valueOrNull(data.author),
      source: valueOrNull(data.source),
      imageUrl: valueOrNull(data.imageUrl),
      lyrics: valueOrNull(data.lyrics),
      pitchData: valueOrNull(data.pitchData),
      publishedDate: new Date().toISOString(),
    };

    if (karaoke) {
      await KaraokeService.update(id, updated);
    } else {
      const { id } = await KaraokeService.create(updated);
      return navigate(`../${id}`);
    }
  };

  const handleUploadedImageUrl = (url: string | null) => {
    setValue("imageUrl", url, { shouldDirty: true });
  };

  const onRemove = async () => {
    if (karaoke) {
      await KaraokeService.delete(karaoke.id);
      navigate("./..", { replace: true });
    } else {
      throw new Error("Karaoke not found");
    }
  };

  const isDirty = !!Object.keys(formState.dirtyFields).length;
  const articleTitle = watch("title");

  return (
    <FormEdit
      onRemove={onRemove}
      hasValidationErrors={Object.keys(errors).length !== 0}
      enableSave={isDirty}
      title={karaoke ? karaoke?.title : "New Karaoke"}
      id={karaoke?.id}
      editType={karaoke?.id ? FormEditType.EDIT : FormEditType.ADD}
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
              "Cover image 1:1": {
                title: "Square image 1:1",
                setUploadUrl: handleUploadedImageUrl,
                uploadImage: KaraokeService.uploadKaraokeImage,
                initialUrl: karaoke?.imageUrl,
                lockedRatio: AspectRatio.OneToOne,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 600*600",
              },
            }}
          />

          <Divider />
          <BJInputFormItem
            control={control}
            error={!!errors?.lyrics}
            label={"Lyrics"}
            message={errors.lyrics?.message}
            required={true}
            autoFocus
            fieldName={"lyrics"}
            rows={20}
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

          <BJSelectFormItem
            size="large"
            control={control}
            required={true}
            error={!!errors.difficulty}
            label={"Difficulty"}
            message={errors.difficulty?.message}
            optionsList={difficulty.map(_c => ({
              key: _c,
              value: _c,
              display: _c,
            }))}
            fieldName={"difficulty"}
          />

          <BJInputFormItem
            control={control}
            error={!!errors.author}
            label={"Author"}
            message={errors.author?.message}
            fieldName={"author"}
            required={false}
          />

          <BJInputFormItem
            control={control}
            error={!!errors.source}
            label={"Source"}
            message={errors.source?.message}
            fieldName={"source"}
            required={false}
          />
        </Col>
      </Row>

      <Divider />
      <BJInputFormItem
        control={control}
        error={!!errors?.pitchData}
        label={"Pitch Array"}
        message={errors.pitchData?.message}
        required={true}
        autoFocus
        rows={20}
        fieldName={"pitchData"}
      />
    </FormEdit>
  );
};
