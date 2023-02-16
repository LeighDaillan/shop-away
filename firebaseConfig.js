// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEzv9PHhPZzpw2KLN3lw3Y2kmRUan_zc8",
  authDomain: "arcane-shop.firebaseapp.com",
  projectId: "arcane-shop",
  storageBucket: "arcane-shop.appspot.com",
  messagingSenderId: "399378159595",
  appId: "1:399378159595:web:c158fbc463b579309d2bae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
