import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbf81FyuM0lQHzEmWEy5LQbBQxx4SfwXc",
  authDomain: "lenden-task.firebaseapp.com",
  projectId: "lenden-task",
  storageBucket: "lenden-task.appspot.com",
  messagingSenderId: "779160864189",
  appId: "1:779160864189:web:df45793c21bd75beedfed4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, provider, storage}
export default db;