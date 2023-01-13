import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnGQgDYT3sJflVYTFuNvoxFm98tEACGd4",
  authDomain: "tdl-tv-v2.firebaseapp.com",
  projectId: "tdl-tv-v2",
  storageBucket: "tdl-tv-v2.appspot.com",
  messagingSenderId: "462238731701",
  appId: "1:462238731701:web:1bf1917e192bfa76699dfc",
  measurementId: "G-X9E43EQNFP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
