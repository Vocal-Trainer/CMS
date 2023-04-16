import firebase from "firebase/compat/app";

export const uploadImage = async (
  file: Blob | ArrayBuffer,
  filePath: string,
  fileName: string
) => {
  const storageRef = firebase.storage().ref(filePath);
  const fileRef = storageRef.child(fileName);
  const ref = await fileRef.put(file);
  const url = await ref.ref.getDownloadURL();
  return url;
};
