// firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
// import serviceAccount from './keys/serviceAccountKey.json';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
let adminApp;

if (!getApps().length) {
    console.info("[firebaseAdmin.js] Initialisation de Firebase Admin...");
    adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.info('[firebaseAdmin.js] Firebase Admin initialisé avec succès.');
} else {
    adminApp = getApp();
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const storage = getStorage(adminApp);

// console.log("[firebaseAdmin.js] Bucket de stockage configuré :", process.env.FIREBASE_STORAGE_BUCKET);
// console.log("[firebaseAdmin.js] Storage :", storage);

export { adminApp };
