import firebase from "../firebase";
import { uploadImage } from "./serviceUtils";

const articleFileStoragePath = "articles";

const toArticle = (doc: any): Article => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    imageUrl: data.imageUrl || null,
    stretchedImageUrl: data.stretchedImageUrl || null,
    squareImageUrl: data.squareImageUrl || null,
    videoUrl: data.videoUrl || null,
    audioUrl: data.audioUrl || null,
    sortOrder: data.sortOrder,
  };
};

const toArticleCategory = (doc: any): ArticleCategory => {
  const data = doc.data();

  return {
    id: doc.id,
    sortOrder: data.sortOrder,
    icon: data.icon || "",
    template: data.template || "",
    show: data.show,
    translations: data.translations,
    restricted: data.restricted,
  };
};

const subscribe = (
  callback: (err: Error | null, articles: Article[]) => void
) =>
  firebase
    .firestore()
    .collection("articles")
    .onSnapshot(
      snapshot => {
        const articles = snapshot.docs.map(toArticle);
        callback(null, articles);
      },
      err => {
        console.log(err);
        callback(err, []);
      }
    );

type CreateArticleData = {
  categoryId: string;
  verifierId: string | null;
  sponsorId: string | null;
  title: string;
  intro: string;
  body: string;
  imageUrl: string | null;
  stretchedImageUrl: string | null;
  squareImageUrl: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  bannerImage1Url: string | null;
  bannerImage2Url: string | null;
  tagWords: string[];
  featuredArticles: string[];
};

const create = (data: CreateArticleData) =>
  firebase.firestore().collection("articles").add(data);

type UpdateArticleData = {
  categoryId: string;
  verifierId: string | null;
  sponsorId: string | null;
  title: string;
  intro: string;
  body: string;
  imageUrl: string | null;
  stretchedImageUrl: string | null;
  squareImageUrl: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  offerId1: string | null;
  offerId2: string | null;
  bannerImage1Url: string | null;
  bannerImage2Url: string | null;
  tagWords: string[];
  featuredArticles: string[];
};

const update = (id: string, data: UpdateArticleData) =>
  firebase
    .firestore()
    .collection("articles")
    .doc(id)
    .update({ ...data });

const deleteArticle = (id: string) =>
  firebase.firestore().collection("articles").doc(id).delete();

const subscribeToCategories = (
  callback: (err: Error | null, snapshot: ArticleCategory[]) => void
) =>
  firebase
    .firestore()
    .collection("articleCategories")
    .onSnapshot(
      snapshot => {
        const docs = snapshot.empty ? [] : snapshot.docs.map(toArticleCategory);
        callback(null, docs);
      },
      err => {
        callback(err, []);
      }
    );

const updateSortOrders = (articles: Article[]) => {
  const batch = firebase.firestore().batch();
  articles.forEach(article => {
    const ref = firebase.firestore().collection("articles").doc(article.id);
    batch.update(ref, { sortOrder: article.sortOrder });
  });
  return batch.commit();
};

const uploadArticleImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, articleFileStoragePath, fileName);
  return url;
};

export const ArticleService = {
  subscribe,
  subscribeToCategories,
  create,
  update,
  updateSortOrders,
  delete: deleteArticle,
  uploadArticleImage,
};
