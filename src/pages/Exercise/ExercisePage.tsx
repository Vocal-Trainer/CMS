import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Divider } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AspectRatio, formValidationError, valueOrNull } from "../../utils";
import { FormEdit, FormEditType } from "../../components";
import { useExercise } from "../../context";
import { ExerciseService, KaraokeService } from "../../services";
import { commonErrors } from "../../language";
import { ImagesCollapse } from "../../components/ImagesCollapse";
import {
  BJDateInputItem,
  BJInputFormItem,
  BJSelectFormItem,
} from "../../components/theme";
import { BJMdFormItem } from "../../components/theme/molecules/formItems/BJFormMarkdown";

type FormValues = {
  title: string;
  subTitle: string;
  content: string;
  length: string;
  day: string;
  imageUrl: string | null;
  exerciseUrl: string;
  publishedDate: string;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  title: yup.string().required(requiredError),
  imageUrl: yup.string().nullable().url(urlError),
});

export const ExercisePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { exercise, loading } = useExercise(id);

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
    if (loading || exercise === null) {
      return;
    }
    reset({ ...exercise });
  }, [exercise, loading, reset]);

  const onSubmit = async (data: FormValues) => {
    const updated: Partial<Exercise> = {
      title: valueOrNull(data.title),
      subTitle: valueOrNull(data.subTitle),
      content: valueOrNull(data.content),
      length: valueOrNull(data.length),
      day: valueOrNull(data.day),
      imageUrl: valueOrNull(data.imageUrl),
      exerciseUrl: valueOrNull(data.exerciseUrl),
      publishDate: new Date().toISOString(),
    };

    if (exercise) {
      await ExerciseService.update(id, updated);
    } else {
      const { id } = await ExerciseService.create(updated);
      return navigate(`../${id}`);
    }
  };

  const handleUploadedImageUrl = (url: string | null) => {
    setValue("imageUrl", url, { shouldDirty: true });
  };

  const onRemove = async () => {
    if (exercise) {
      await KaraokeService.delete(id);
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
      title={exercise ? exercise?.title : "New Exercise"}
      id={exercise?.id}
      editType={exercise?.id ? FormEditType.EDIT : FormEditType.ADD}
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
          <BJInputFormItem
            control={control}
            error={!!errors?.subTitle}
            label={"Sub Title"}
            message={errors.subTitle?.message}
            required={true}
            autoFocus
            fieldName={"subTitle"}
          />

          <ImagesCollapse
            title="Image URL"
            config={{
              "Cover image 4:2": {
                title: "Square image 4:2",
                setUploadUrl: handleUploadedImageUrl,
                uploadImage: ExerciseService.uploadExerciseImage,
                initialUrl: exercise?.imageUrl,
                lockedRatio: AspectRatio.OneToOne,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 600*600",
              },
            }}
          />

          <Divider />
        </Col>

        <Col span={12}>
          <BJSelectFormItem
            size="large"
            control={control}
            required={true}
            error={!!errors.day}
            label={"Day"}
            message={errors.day?.message}
            optionsList={Array(360)
              .fill("")
              .map((_, index) => ({
                key: `${index}`,
                value: `${index}`,
                display: `${index}`,
              }))}
            fieldName={"day"}
          />

          <BJInputFormItem
            control={control}
            error={!!errors.length}
            label={"Length"}
            message={errors.length?.message}
            fieldName={"length"}
            required={true}
          />

          <BJInputFormItem
            control={control}
            error={!!errors.exerciseUrl}
            label={"Exercise Url"}
            message={errors.exerciseUrl?.message}
            fieldName={"exerciseUrl"}
            required={true}
          />

          <BJDateInputItem
            control={control}
            error={!!errors.day}
            label={"Publish date"}
            message={errors.publishedDate?.message}
            fieldName={"publishedDate"}
            required={false}
          />
        </Col>
      </Row>
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
