import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const API_KEY = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDOU4YNost0h0cQDo8EQRCZyVZabeEQ-GY",
  authDomain: "crm-passenger.firebaseapp.com",
  projectId: "crm-passenger",
  storageBucket: "crm-passenger.appspot.com",
  messagingSenderId: "649743192332",
  appId: "1:649743192332:web:3f42405ffaa97d5f8cb929",
  measurementId: "G-Y0MH66Z786",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
