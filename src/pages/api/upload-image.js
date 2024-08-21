import { IncomingForm } from 'formidable';
import { getSession } from 'next-auth/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    // console.log("Upload image API handler called.");

    const session = await getSession({ req });
    // console.log("Session retrieved:", session);

    if (!session) {
        console.error("User not authenticated.");
        return res.status(401).json({ message: "Non authentifié" });
    }

    const form = new IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).json({ message: "Erreur lors du traitement du formulaire" });
        }

        // console.log("Fields:", fields);
        // console.log("Files:", files);

        const section = fields.section[0];
        const index = parseInt(fields.index[0], 10);
        const file = files.image?.[0];

        if (!file || !file.filepath) {
            console.error("Invalid file received or file path missing");
            return res.status(400).json({ message: "Aucun fichier valide reçu" });
        }

        const fileName = file.originalFilename || `image-${index}-${Date.now()}`;
        const storageRef = ref(storage, `${section}/image-${index}-${fileName}`);

        try {
            // Lire le fichier depuis le chemin temporaire fourni par formidable
            const buffer = fs.readFileSync(file.filepath);

            // Uploader le fichier à Firebase Storage
            const snapshot = await uploadBytes(storageRef, buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            // console.log("File uploaded successfully. Download URL:", downloadURL);

            // Mise à jour dans Firestore
            const documentRef = doc(db, "menuData", "menus");
            const docSnap = await getDoc(documentRef);

            if (docSnap.exists()) {
                // console.log("Document found, updating Firestore...");

                const currentData = docSnap.data();

                if (section === 'heroSection') {
                    const heroSection = currentData.heroSection || { images: [] };

                    if (!Array.isArray(heroSection.images)) {
                        heroSection.images = [];
                    }

                    // S'assurer que l'index est dans les limites du tableau
                    while (heroSection.images.length <= index) {
                        heroSection.images.push({});
                    }

                    // Mettre à jour l'image à l'index spécifié
                    heroSection.images[index] = {
                        ...heroSection.images[index],  // Conserver les autres données de l'image (ex: alt)
                        src: downloadURL
                    };

                    const updateField = { heroSection };

                    await updateDoc(documentRef, updateField);
                } else {
                    // Mise à jour des autres sections qui sont des tableaux d'objets
                    const sectionData = currentData[section] || [];

                    // Vérifier que sectionData est un tableau
                    if (!Array.isArray(sectionData)) {
                        throw new Error(`La section ${section} n'est pas un tableau`);
                    }

                    // S'assurer que l'index est dans les limites du tableau
                    while (sectionData.length <= index) {
                        sectionData.push({});
                    }

                    sectionData[index] = {
                        ...sectionData[index],  // Conserver les autres données de l'objet
                        imageUrl: downloadURL
                    };

                    const updateField = { [section]: sectionData };

                    await updateDoc(documentRef, updateField);
                }

                // console.log("Firestore document updated successfully.");
            } else {
                console.error("Document not found in Firestore.");
                throw new Error("Document not found");
            }

            res.status(200).json({ imageUrl: downloadURL });
        } catch (error) {
            console.error("Error during image upload or Firestore update:", error);
            res.status(500).json({ message: "Error uploading image" });
        }
    });
}
