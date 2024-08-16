// pages/api/admin-data.js

import fs from "fs";
import path from "path";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    // Vérification de l'authentification
    if (!session) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    // Vérification si l'utilisateur est autorisé
    const authorizedEmail = process.env.AUTHORIZED_EMAIL;
    if (session.user.email !== authorizedEmail) {
        return res.status(403).json({ message: 'Accès interdit' });
    }

    const filePath = path.join(process.cwd(), "public", "admin-data.json");

    if (req.method === "GET") {
        const jsonData = fs.readFileSync(filePath, "utf8");
        res.status(200).json(JSON.parse(jsonData));
    } else if (req.method === "POST") {
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
        res.status(200).json({ message: "Données mises à jour avec succès !" });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}


