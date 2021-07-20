import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCkzWxy8zQVWkQyCT5l_sb9ipeqPtxcfyU",
  authDomain: "linkedin-clone-1003.firebaseapp.com",
  projectId: "linkedin-clone-1003",
  storageBucket: "linkedin-clone-1003.appspot.com",
  messagingSenderId: "193141829010",
  appId: "1:193141829010:web:216def6faef4e9bda3254b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
