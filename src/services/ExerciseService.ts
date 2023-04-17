import firebase from "../firebase";
import { uploadImage } from "./serviceUtils";
import { firebaseCollectionNames } from "../utils";
const { exercises } = firebaseCollectionNames;

const toExercise = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Exercise => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    subTitle: data.subTitle,
    content: data.content,
    length: data.length,
    day: data.day,
    imageUrl: data.imageUrl || null,
    exerciseUrl: data.exerciseUrl,
    publishDate: data.publishDate,
  };
};

const subscribe = (
  callback: (err: Error | null, exercise: Exercise[]) => void
) =>
  firebase
    .firestore()
    .collection(exercises)
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

const create = (data: Partial<Exercise>) =>
  firebase.firestore().collection(exercises).add(data);

const update = (id: Exercise["id"], data: Partial<Exercise>) =>
  firebase
    .firestore()
    .collection(exercises)
    .doc(id)
    .update({ ...data });

const deleteExercise = (id: Exercise["id"]) =>
  firebase.firestore().collection(exercises).doc(id).delete();

const uploadExerciseImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, exercises, fileName);
  return url;
};

export const ExerciseService = {
  subscribe,
  create,
  update,
  delete: deleteExercise,
  uploadExerciseImage,
};
