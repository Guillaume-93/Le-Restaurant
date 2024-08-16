// pages/api/menu-data.js

import { getToken } from "next-auth/jwt";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // console.log("Token received in API handler:", token);

    if (!token) {
        console.error("Token non trouvé ou utilisateur non authentifié");
        return res.status(401).json({ error: "Unauthorized" });
    }

    // console.log("Token trouvé : ", token);

    const filePath = path.join(process.cwd(), "public", "menu-data.json");

    try {
        if (req.method === "GET") {
            const jsonData = fs.readFileSync(filePath, "utf8");
            res.status(200).json(JSON.parse(jsonData));
        } else if (req.method === "POST") {
            // console.log("POST Request Data:", req.body); // Affiche les données reçues dans les logs
            fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2)); // Sauvegarde les données reçues dans le fichier JSON
            res.status(200).json({ message: "Data updated successfully" });
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
