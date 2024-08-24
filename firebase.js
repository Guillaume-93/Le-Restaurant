// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./src/lib/firebaseConfig.js";

console.info("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
console.info('Firebase initialized successfully.');

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
