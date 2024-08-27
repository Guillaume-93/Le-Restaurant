// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./src/lib/firebaseConfig.js";

let app;

if (!getApps().length) {
    console.info("[firebase.js] Initialisation de Firebase...");
    app = initializeApp(firebaseConfig);
    console.info('[firebase.js] Firebase initialisé avec succès.');
} else {
    app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

console.log("[firebase.js] Firestore, Storage et Auth prêts à l'emploi");

export { db, storage, auth };
