// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCiWSNgttwNxtw1F6t4r4uumpaC-rE_LYk",
  authDomain: "house-marketplace-app-120b9.firebaseapp.com",
  projectId: "house-marketplace-app-120b9",
  storageBucket: "house-marketplace-app-120b9.appspot.com",
  messagingSenderId: "824935160962",
  appId: "1:824935160962:web:720a2d4ba7e8aa1611a89b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(); 