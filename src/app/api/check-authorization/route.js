// app/api/check-authorization/route.js

export async function POST(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email requis" });
        }

        const authorizedEmails = process.env.AUTHORIZED_EMAIL.split(',').map(email => email.trim());

        if (authorizedEmails.includes(email)) {
            return res.status(200).json({ isAuthorized: true });
        } else {
            return res.status(403).json({ isAuthorized: false });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'autorisation:", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
}
