import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIURJ8b5ZicoYYY-OAMZnc6hBTGL7L0SA",
  authDomain: "digital-gueztbook.firebaseapp.com",
  projectId: "digital-gueztbook",
  storageBucket: "digital-gueztbook.appspot.com",
  messagingSenderId: "111479365914",
  appId: "1:111479365914:web:b051b4f416f16ea4a6cca3",
  measurementId: "G-60GN3M1PPT"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app)