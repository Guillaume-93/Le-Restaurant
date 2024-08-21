import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./src/lib/firebaseConfig.js";

// console.log("Firebase config in firebase.js:", firebaseConfig);
// console.log('Using Firebase API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Initialisation de Firebase
// console.log("Initializing Firebase in firebase.js...");
const app = initializeApp(firebaseConfig);
// console.log('Firebase app initialized:', app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// console.log("Firebase initialized in firebase.js.");

export { db, storage, auth };
