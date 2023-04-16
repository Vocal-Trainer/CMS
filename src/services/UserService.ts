import { httpsCallable } from "firebase/functions";
import firebase, { functions } from "../firebase";
import { cloudFunctionNames, firebaseCollectionNames } from "../utils";
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

const deleteUser = async (userId: string, comment: string, reason: string) => {
  try {
    const deleteUserCallable = httpsCallable(
      functions,
      cloudFunctionNames.deleteUser
    );
    const result = await deleteUserCallable({
      uid: userId,
      comment: comment,
      reason: reason,
    });
    return result.data;
  } catch (error) {
    console.log("error occured while deleting record", error);
    throw error;
  }
};

const grantUserPermissions = async (userId: string, permissions: string[]) => {
  try {
    const grantUserPermissionsCallable = httpsCallable(
      functions,
      cloudFunctionNames.grantUserPermissions
    );
    const result = await grantUserPermissionsCallable({
      uid: userId,
      permissions: permissions,
    });
    return result.data;
  } catch (error) {
    console.log("error occured while up record", error);
    throw error;
  }
};

const registerWithEmailAndPassword = async (
  displayName: string,
  email: string,
  password: string,
  permissions: string[]
) => {
  try {
    const createAuthUserWithClaims = httpsCallable(
      functions,
      cloudFunctionNames.createAuthUserWithClaims
    );
    const result = await createAuthUserWithClaims({
      displayName,
      email,
      password,
      permissions,
    });
    return result.data;
  } catch (error) {
    console.log("error occured while up record", error);
    throw error;
  }
};

export const UserService = {
  subscribe,
  exists,
  createUser,
  updateName,
  deleteUser,
  grantUserPermissions,
  registerWithEmailAndPassword,
};
