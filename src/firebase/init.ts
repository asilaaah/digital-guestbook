// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIURJ8b5ZicoYYY-OAMZnc6hBTGL7L0SA",
  authDomain: "digital-gueztbook.firebaseapp.com",
  projectId: "digital-gueztbook",
  storageBucket: "digital-gueztbook.appspot.com",
  messagingSenderId: "111479365914",
  appId: "1:111479365914:web:b051b4f416f16ea4a6cca3",
  measurementId: "G-60GN3M1PPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore(app)
export default db