import firebase from "../firebase";
import { uploadImage } from "./serviceUtils";
import { firebaseCollectionNames } from "../utils";
const { karaokes } = firebaseCollectionNames;

const toExercise = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Karaoke => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    difficulty: data.difficulty,
    author: data.author,
    source: data.source,
    category: data.category,
    imageUrl: data.imageUrl || null,
    publishedDate: data.publishedDate,
    pitchData: data.pitchData,
    lyrics: data.lyrics,
  };
};

const subscribe = (callback: (err: Error | null, karaoke: Karaoke[]) => void) =>
  firebase
    .firestore()
    .collection(karaokes)
    .onSnapshot(
      snapshot => {
        const _exercise = snapshot.docs.map(toExercise);
        callback(null, _exercise);
      },
      err => {
        console.log(err);
        callback(err, []);
      }
    );

const create = (data: Partial<Karaoke>) =>
  firebase.firestore().collection(karaokes).add(data);

const update = (id: Karaoke["id"], data: Partial<Karaoke>) =>
  firebase
    .firestore()
    .collection(karaokes)
    .doc(id)
    .update({ ...data });

const deleteKaraoke = (id: Karaoke["id"]) =>
  firebase.firestore().collection(karaokes).doc(id).delete();

const uploadKaraokeImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, karaokes, fileName);
  return url;
};

export const KaraokeService = {
  subscribe,
  create,
  update,
  delete: deleteKaraoke,
  uploadKaraokeImage,
};
