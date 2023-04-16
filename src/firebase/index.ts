import firebaseDevConfig from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { initializeFirestore } from "firebase/firestore";
import { cloudFunctionRegion } from "../utils";

const app = firebase.initializeApp(firebaseDevConfig);
const firestoreNew = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

const auth = firebase.auth();
const functions = getFunctions(app, cloudFunctionRegion);
const firestore = firebase.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
if (
  process.env.REACT_APP_ENABLE_EMULATOR_MODE === "yes" &&
  window.location.hostname.includes("localhost")
) {
  auth.useEmulator("http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  firestore.useEmulator("localhost", 8080);
}

export { firebase, auth, functions, firestore, firestoreNew };
export default firebase;
