// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDfwf1PKPkUjeTeO6P1CGT0iUFCAcY0LK8",
  authDomain: "crud-firebase-ede0a.firebaseapp.com",
  databaseURL: "https://crud-firebase-ede0a-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-ede0a",
  storageBucket: "crud-firebase-ede0a.appspot.com",
  messagingSenderId: "911084304653",
  appId: "1:911084304653:web:fd8ca314bceff68625d844",
  measurementId: "G-81JS87NS2J",
});
const database = getDatabase(firebaseConfig);
// const analytics = getAnalytics(app);

export { database }
