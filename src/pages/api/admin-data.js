// pages/api/admin-data.js

import fs from "fs";
import path from "path";
import { getSession } from 'next-auth/react';
import { auth } from '../../../firebase.js';

export default async function handler(req, res) {
    const session = await getSession({ req });

    // Vérification de l'authentification via NextAuth
    if (!session) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    // Récupération de l'UID Firebase depuis la session
    const firebaseUid = session.user.firebaseUid;
    // console.log("Firebase UID:", firebaseUid);

    // Vérification de l'UID Firebase
    if (!firebaseUid) {
        return res.status(403).json({ message: 'Utilisateur non autorisé à accéder aux données administratives' });
    }

    // Vérification si l'utilisateur est autorisé via l'email
    const authorizedEmails = process.env.AUTHORIZED_EMAIL.split(',').map(email => email.trim());
    if (!authorizedEmails.includes(session.user.email)) {
        return res.status(403).json({ message: 'Accès interdit' });
    }

    const filePath = path.join(process.cwd(), "public", "admin-data.json");

    if (req.method === "GET") {
        try {
            const jsonData = fs.readFileSync(filePath, "utf8");
            res.status(200).json(JSON.parse(jsonData));
        } catch (error) {
            console.error("Erreur lors de la lecture des données admin:", error);
            res.status(500).json({ message: "Erreur lors de la lecture des données admin" });
        }
    } else if (req.method === "POST") {
        try {
            fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
            res.status(200).json({ message: "Données mises à jour avec succès !" });
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données admin:", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour des données admin" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}
