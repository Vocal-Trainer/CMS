import firebase from "../firebase";
import { firebaseCollectionNames } from "../utils";
const { admins } = firebaseCollectionNames;

const subscribe = (
  userId: Admin["id"],
  callback: (err: Error | null, user: Admin | null) => void
) =>
  firebase
    .firestore()
    .collection(admins)
    .doc(userId)
    .onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          return callback(null, null);
        }
        const data = snapshot.data();
        return callback(null, {
          id: snapshot.id,
          name: data?.name,
          roles: data?.roles || [],
          partnerId: data?.partnerId || null,
          freshAccount: data.freshAccount || false,
        });
      },
      err => {
        console.log(err);
        callback(err, null);
      }
    );

const exists = (userId: Admin["id"]) =>
  firebase
    .firestore()
    .collection(admins)
    .doc(userId)
    .get()
    .then(doc => doc.exists);

const createUser = (userId: Admin["id"], userName: string = null) =>
  firebase
    .firestore()
    .collection(admins)
    .doc(userId)
    .set({ id: userId, name: userName, partnerId: null }, { merge: true });

const updateName = (userId: Admin["id"], name: string) =>
  firebase
    .firestore()
    .collection("admins")
    .doc(userId)
    .set({ name }, { merge: true });

export const UserService = {
  subscribe,
  exists,
  createUser,
  updateName,
};
