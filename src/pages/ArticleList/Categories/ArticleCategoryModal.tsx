import {
  Col,
  Row,
  Form,
  Select,
  Switch,
  Divider,
  Input,
  Typography,
  Space,
} from "antd";
import { useEffect } from "react";
import BJInput from "../../../components/theme/atoms/BJInput";
import { appIcons } from "../../../data/app-icons";
import { ArticleCategoryService } from "../../../services";
import { Controller, useForm } from "react-hook-form";
import { FormModal } from "../../../components";
import { commonErrors } from "../../../language";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidationError } from "../../../utils";

const templates = [
  "Health",
  "Birth",
  "Exercise",
  "Baby",
  "BreastFeeding",
  "Pregnancy",
];

interface Props {
  show: boolean;
  onHide: () => void;
  category?: ArticleCategory | null;
}

type FormValues = {
  template: articleCategoryTemplateTypes;
  icon: string;
  titleSv: string;
  titleEn: string;
  descriptionSv: string;
  descriptionEn: string;
  show: boolean;
  restricted: boolean;
};

const schema = yup.object().shape({
  titleSv: yup.string().required(commonErrors.requiredError),
  icon: yup.string().required(commonErrors.requiredError),
});

export const ArticleCategoryModal = ({
  show: showModal,
  onHide,
  category,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      template: category?.template ?? "Birth",
      icon: category?.icon ?? "",
      titleSv: category?.translations.sv.title ?? "",
      titleEn: category?.translations.en.title ?? "",
      descriptionSv: category?.translations.sv.description ?? "",
      descriptionEn: category?.translations.en.description ?? "",
      show: category?.show,
      restricted: category?.restricted,
    });
  }, [category, reset, showModal]);

  const onSubmit = async (data: FormValues) => {
    const {
      icon,
      show,
      template,
      titleSv,
      titleEn,
      descriptionSv,
      descriptionEn,
      restricted,
    } = data;
    const payload = {
      icon: icon,
      show: show ?? false,
      template: template,
      sortOrder: 0,
      translations: {
        sv: {
          title: titleSv ?? null,
          description: descriptionSv ?? null,
        },
        en: {
          title: titleEn ?? null,
          description: descriptionEn ?? null,
        },
      },
      restricted: restricted ?? false,
    };
    if (category) {
      await ArticleCategoryService.update({ ...payload, id: category.id });
    } else {
      await ArticleCategoryService.create(payload);
    }
  };

  const onDelete = async () => {
    if (category !== null) {
      await ArticleCategoryService.delete(category!.id);
    } else {
      throw new Error("Category not found");
    }
  };

  const isDirty = !!Object.keys(formState.dirtyFields).length;
  const titleSv = watch("titleSv");

  return (
    <FormModal
      onHide={onHide}
      enableSave={isDirty}
      show={showModal}
      onDelete={onDelete}
      enableDelete={!!category}
      modalSubTitle={category ? `ID - ${category?.id}` : ""}
      modalTitle={
        category ? category.translations.sv.title : "Add new category"
      }
      recordIdentifier={titleSv}
      onSubmit={handleSubmit(onSubmit, formValidationError)}
    >
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label="Template">
            <Controller
              control={control}
              name="template"
              render={({ field }) => (
                <Select {...field}>
                  <Select.Option value="">-</Select.Option>
                  {templates.map(template => (
                    <Select.Option value={template} key={template}>
                      {template}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Icon"
            extra="Icon is shown on the discover screen"
            required
            help={
              errors.icon && (
                <Typography.Text type="danger">
                  {errors.icon?.message}
                </Typography.Text>
              )
            }
          >
            <Controller
              control={control}
              name="icon"
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value}>
                  <Select.Option value="">-</Select.Option>
                  {appIcons
                    .sort((a, b) => a.localeCompare(b))
                    .map(icon => (
                      <Select.Option value={icon} key={icon}>
                        {icon}
                      </Select.Option>
                    ))}
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Title (Svenska)"
        required
        extra={
          <Typography.Paragraph type="danger">
            {errors.titleSv?.message}
          </Typography.Paragraph>
        }
      >
        <Controller
          control={control}
          name="titleSv"
          render={({ field: { onChange, value } }) => (
            <BJInput onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item label="Description (Svenska)">
        <Controller
          control={control}
          name="descriptionSv"
          render={({ field: { onChange, value } }) => (
            <Input.TextArea rows={4} onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Divider />
      <Form.Item label="Title (English)">
        <Controller
          control={control}
          name="titleEn"
          render={({ field: { onChange, value } }) => (
            <BJInput onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item label="Description (English)">
        <Controller
          control={control}
          name="descriptionEn"
          render={({ field: { onChange, value } }) => (
            <Input.TextArea rows={4} onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Row>
        <Space size="large">
          <Form.Item label="Visible">
            <Controller
              control={control}
              name="show"
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </Form.Item>
          <Form.Item label="Restricted">
            <Controller
              control={control}
              name="restricted"
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </Form.Item>
        </Space>
      </Row>
    </FormModal>
  );
};
