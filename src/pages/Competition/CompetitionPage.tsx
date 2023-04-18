import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Divider, List } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AspectRatio, formValidationError, valueOrNull } from "../../utils";
import { FormEdit, FormEditType } from "../../components";
import { CompetitionsService } from "../../services";
import { commonErrors } from "../../language";
import { ImagesCollapse } from "../../components/ImagesCollapse";
import { BJInputFormItem, BJSwitchFormItem } from "../../components/theme";
import { useCompetition } from "../../context/CompetitionContext";
import { ParticipantListItem } from "./ParticipantListItem";

type FormValues = {
  lyrics: string;
  isActive: boolean;
  imageUrl: string;
  title: string;
  maxPoint: number;
};

const { urlValidationError: urlError, requiredError } = commonErrors;

const schema = yup.object().shape({
  title: yup.string().required(requiredError),
  imageUrl: yup.string().nullable().url(urlError),
  maxPoint: yup.number().required(requiredError),
  lyrics: yup.string().nullable().url(urlError),
  isActive: yup.boolean().required(requiredError),
});

export const CompetitionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { competition, participants, loading } = useCompetition(id);

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
    if (loading || competition === null) {
      return;
    }
    reset({ ...competition });
  }, [competition, loading, reset]);

  const onSubmit = async (data: FormValues) => {
    const updated: Partial<Competition> = {
      title: valueOrNull(data.title),
      imageUrl: valueOrNull(data.imageUrl),
      lyrics: valueOrNull(data.lyrics),
      isActive: valueOrNull(data.isActive),
      maxPoint: valueOrNull(data.maxPoint),
      publishedDate: new Date().toISOString(),
    };

    if (competition) {
      await CompetitionsService.update(id, updated);
    } else {
      const { id } = await CompetitionsService.create(updated);
      return navigate(`../${id}`);
    }
  };

  const handleUploadedImageUrl = (url: string | null) => {
    setValue("imageUrl", url, { shouldDirty: true });
  };

  const onRemove = async () => {
    if (competition) {
      await CompetitionsService.delete(id);
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
      title={competition ? competition?.title : "New Competition"}
      id={competition?.id}
      editType={competition?.id ? FormEditType.EDIT : FormEditType.ADD}
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
              "Cover image 4:2": {
                title: "Square image 4:2",
                setUploadUrl: handleUploadedImageUrl,
                uploadImage: CompetitionsService.uploadCompetitionImage,
                initialUrl: competition?.imageUrl,
                lockedRatio: AspectRatio.OneToOne,
                defaultCropBoxWidth: 300,
                extra: "Best resolution for this would be 600*600",
              },
            }}
          />
        </Col>

        <Col span={12}>
          <BJSwitchFormItem
            control={control}
            error={!!errors.isActive}
            label={"Is Active"}
            message={errors.isActive?.message}
            fieldName={"isActive"}
            required={true}
          />

          <BJInputFormItem
            control={control}
            error={!!errors.maxPoint}
            label={"Max Point"}
            message={errors.maxPoint?.message}
            fieldName={"maxPoint"}
            required={true}
          />
        </Col>
      </Row>
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
      <Divider />
      {competition && (
        <List bordered>
          {participants.map(content => (
            <ParticipantListItem key={content.id} value={content} />
          ))}
        </List>
      )}
    </FormEdit>
  );
};
