import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_DAR_oyb63RTbm9ve5Yq-yy6r6nHUxeo",
  authDomain: "companies-directory-260e3.firebaseapp.com",
  projectId: "companies-directory-260e3",
  storageBucket: "companies-directory-260e3.firebasestorage.app",
  messagingSenderId: "223720611834",
  appId: "1:223720611834:web:63fc44088988185c9b4e43",
  measurementId: "G-9WB9WN6178"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
