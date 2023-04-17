import firebase from "../firebase";
import { uploadImage } from "./serviceUtils";
import { firebaseCollectionNames } from "../utils";
const { articles } = firebaseCollectionNames;

const toArticle = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Article => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    shortDescription: data.shortDescription,
    content: data.content,
    imageUrl: data.imageUrl || null,
    squareImageUrl: data.squareImageUrl || null,
    author: data.author,
    source: data.source,
    category: data.category,
    publishedDate: data.publishedDate,
  };
};

const subscribe = (
  callback: (err: Error | null, articles: Article[]) => void
) =>
  firebase
    .firestore()
    .collection(articles)
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
  firebase.firestore().collection(articles).add(data);

const update = (id: string, data: Partial<Article>) =>
  firebase
    .firestore()
    .collection(articles)
    .doc(id)
    .update({ ...data });

const deleteArticle = (id: string) =>
  firebase.firestore().collection(articles).doc(id).delete();

const uploadArticleImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, articles, fileName);
  return url;
};

export const ArticleService = {
  subscribe,
  create,
  update,
  delete: deleteArticle,
  uploadArticleImage,
};
