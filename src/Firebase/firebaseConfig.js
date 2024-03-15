import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB5hUW4p-VbzJ9CrKCJm4Vx7BNOb_vF_cM",
  authDomain: "e-commerce-57df2.firebaseapp.com",
  projectId: "e-commerce-57df2",
  storageBucket: "e-commerce-57df2.appspot.com",
  messagingSenderId: "900983502359",
  appId: "1:900983502359:web:c78656b12c972681550e52",
  measurementId: "G-CE19PBYMPC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
