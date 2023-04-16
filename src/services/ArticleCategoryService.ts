import firebase from "../firebase";

type CreateCategoryData = {
  icon: string;
  show: boolean;
  sortOrder: number;
  template: string;
  translations: {
    sv: { title: string; description: string };
    en: { title: string; description: string };
  };
};

const create = (data: CreateCategoryData) =>
  firebase
    .firestore()
    .collection("articleCategories")
    .add({ ...data });

const update = (data: ArticleCategory) =>
  firebase
    .firestore()
    .collection("articleCategories")
    .doc(data.id)
    .update({ ...data });

const deleteCategory = (id: ArticleCategory["id"]) =>
  firebase.firestore().collection("articleCategories").doc(id).delete();

export const ArticleCategoryService = {
  create,
  update,
  delete: deleteCategory,
};
