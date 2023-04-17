import firebaseDevConfig from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeFirestore } from "firebase/firestore";

const app = firebase.initializeApp(firebaseDevConfig);
const firestoreNew = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

const auth = firebase.auth();
const firestore = firebase.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export { firebase, auth, firestore, firestoreNew };
export default firebase;
