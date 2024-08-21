import { getToken } from 'next-auth/jwt';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseConfig from "../../lib/firebaseConfig";

// console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log("Firebase initialized.");

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const documentRef = doc(db, "menuData", "menus");
            const docSnap = await getDoc(documentRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const normalizedData = {
                    menusPrices: data.menusPrices.map(item => ({
                        ...item,
                        features: Array.isArray(item.features) ? item.features : [],
                    })),
                    menuCarte: data.menuCarte.map(item => ({
                        ...item,
                        category: item.category ? (Array.isArray(item.category) ? item.category : ["Non spécifié"]) : ["Non spécifié"],
                    })),
                    dessertsMenu: data.dessertsMenu.map(item => ({
                        ...item,
                        category: item.category ? (Array.isArray(item.category) ? item.category : ["Non spécifié"]) : ["Non spécifié"],
                    })),
                    wineMenu: data.wineMenu.map(item => ({
                        ...item,
                        category: item.category ? (Array.isArray(item.category) ? item.category : ["Non spécifié"]) : ["Non spécifié"],
                    })),
                    heroSection: {
                        ...data.heroSection,
                        images: Array.isArray(data.heroSection.images) ? data.heroSection.images : []
                    }
                };

                res.status(200).json(normalizedData);
            } else {
                res.status(404).json({ message: "Document non trouvé" });
            }
        } else if (req.method === 'POST') {
            // Token requis pour les requêtes POST
            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
            if (!token) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const documentRef = doc(db, "menuData", "menus");
            const updatedData = req.body;

            await setDoc(documentRef, updatedData);

            res.status(200).json({ message: "Data updated successfully" });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
