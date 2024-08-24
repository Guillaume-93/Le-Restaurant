// app/api/admin-data/route.js

import fs from "fs";
import path from "path";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js'; 

export async function GET(req) {
    const session = await getServerSession(req, authOptions);

    if (!session || session.user.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    const filePath = path.join(process.cwd(), "public", "admin-data.json");

    try {
        if (!fs.existsSync(filePath)) {
            return new Response(JSON.stringify({ message: "Le fichier admin-data.json est manquant." }), { status: 404 });
        }
        const jsonData = fs.readFileSync(filePath, "utf8");
        return new Response(jsonData, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la lecture des données admin:", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la lecture des données admin" }), { status: 500 });
    }
}

export async function POST(req) {
    const session = await getServerSession(req, authOptions);

    if (!session || session.user.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    const filePath = path.join(process.cwd(), "public", "admin-data.json");

    try {
        const data = await req.json();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return new Response(JSON.stringify({ message: "Données mises à jour avec succès !" }), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données admin:", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la mise à jour des données admin" }), { status: 500 });
    }
}
