import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCfqFX63lzC9PCVK3spYfXtQ2tJRHSzoZE",
  authDomain: "mynextvintage.firebaseapp.com",
  projectId: "mynextvintage",
  storageBucket: "mynextvintage.appspot.com",
  messagingSenderId: "625927634165",
  appId: "1:625927634165:web:fb5a68809d84e3ce3219bc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)