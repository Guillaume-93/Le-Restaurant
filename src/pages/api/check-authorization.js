// pages/api/check-authorization.js

export default function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        const authorizedEmails = process.env.AUTHORIZED_EMAIL.split(',').map(email => email.trim());

        // Vérifier si l'email est dans la liste des emails autorisés
        if (authorizedEmails.includes(email)) {
            res.status(200).json({ isAuthorized: true });
        } else {
            res.status(403).json({ isAuthorized: false });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
