import firebase from "../firebase";
import { uploadImage } from "./serviceUtils";
import { firebaseCollectionNames } from "../utils";
const { competitions, participants } = firebaseCollectionNames;

const toCompetition = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  return {
    id: doc.id,
    ...doc.data(),
  } as Competition;
};

const toParticipants = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  return {
    id: doc.id,
    ...doc.data(),
  } as Participant;
};

const subscribe = (
  callback: (err: Error | null, competitions: Competition[]) => void
) =>
  firebase
    .firestore()
    .collection(competitions)
    .onSnapshot(
      snapshot => {
        return callback(null, snapshot.docs.map(toCompetition));
      },
      err => {
        console.log("Error fetching competition", err);
        return callback(err, []);
      }
    );

const subscribeParticipants = (competitionId: Competition["id"]) =>
  firebase
    .firestore()
    .collection(`${competitions}/${competitionId}/${participants}`)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(toParticipants);
    })
    .catch(err => {
      console.log("Error fetching participants", err);
      return err;
    });

const create = (data: Partial<Competition>) =>
  firebase.firestore().collection(competitions).add(data);

const update = (id: string, data: Partial<Competition>) =>
  firebase
    .firestore()
    .collection(competitions)
    .doc(id)
    .update({ ...data });

const deleteCompetition = (id: Competition["id"]) =>
  firebase.firestore().collection(competitions).doc(id).delete();

const uploadCompetitionImage = async (
  file: Blob | ArrayBuffer,
  fileName: string
) => {
  const url = uploadImage(file, competitions, fileName);
  return url;
};

export const CompetitionsService = {
  subscribe,
  subscribeParticipants,
  create,
  update,
  delete: deleteCompetition,
  uploadCompetitionImage,
};
