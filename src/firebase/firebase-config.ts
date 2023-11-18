// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: "de-meza-a-tu-mesa.firebaseapp.com",
  projectId: "de-meza-a-tu-mesa",
  storageBucket: "de-meza-a-tu-mesa.appspot.com",
  messagingSenderId: import.meta.env.MESSAGINGSENDERID,
  appId: import.meta.env.API_ID,
  measurementId: import.meta.env.MEASUREMENTID
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore()
