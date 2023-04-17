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

const create = (data: Partial<Article>) =>
  firebase.firestore().collection("articles").add(data);

const update = (id: string, data: Partial<Article>) =>
  firebase
    .firestore()
    .collection("articles")
    .doc(id)
    .update({ ...data });

const deleteArticle = (id: string) =>
  firebase.firestore().collection("articles").doc(id).delete();

const uploadArticleImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, articleFileStoragePath, fileName);
  return url;
};

export const ArticleService = {
  subscribe,
  create,
  update,
  delete: deleteArticle,
  uploadArticleImage,
};
