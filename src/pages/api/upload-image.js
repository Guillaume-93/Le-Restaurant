import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { getSession } from 'next-auth/react';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Fonction pour mettre à jour le fichier JSON
const updateJsonFile = (filePath, section, index, imageUrl) => {
    try {
        // console.log("Chemin du fichier JSON:", filePath);
        // console.log("Section:", section, "Index:", index, "ImageUrl:", imageUrl);

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // console.log("Contenu du fichier JSON avant modification:", data);

        const menuSection = data[section];
        // console.log("Section sélectionnée:", menuSection);

        if (menuSection && menuSection[index]) {
            menuSection[index].imageUrl = imageUrl;
            // console.log("Image URL mise à jour pour l'index", index);
        } else {
            console.error('La section ou l\'index n\'a pas été trouvé dans le fichier JSON');
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        // console.log('Fichier JSON mis à jour avec succès');
        // console.log("Contenu du fichier JSON après modification:", data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier JSON:', error);
    }
};


export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        console.error("Session non trouvée ou utilisateur non authentifié lors de l'upload");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // console.log("Session trouvée lors de l'upload d'image : ", session);

    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Erreur lors du parsing du formulaire: ", err);
            return res.status(500).json({ message: 'Erreur lors du traitement du formulaire' });
        }

        const section = Array.isArray(fields.section) ? fields.section[0] : fields.section;
        const index = Array.isArray(fields.index) ? fields.index[0] : fields.index;

        const filesArray = Array.isArray(files.image) ? files.image : [files.image];

        const responses = [];

        filesArray.forEach((f, i) => {
            const filePath = f.filepath;
            const originalFilename = f.originalFilename;

            if (!filePath || !originalFilename) {
                console.error("Aucun fichier valide fourni");
                return res.status(400).json({ message: 'Aucun fichier valide fourni' });
            }

            try {
                const uploadDir = path.join(process.cwd(), 'public', 'images', 'upload', section);

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const fileName = `image-${index}-${i}${path.extname(originalFilename)}`;
                const destinationPath = path.join(uploadDir, fileName);

                fs.renameSync(filePath, destinationPath);
                // console.log('Fichier déplacé avec succès:', destinationPath);

                const imageUrl = `/images/upload/${section}/${fileName}`;
                responses.push({ imageUrl });

                const jsonFilePath = path.join(process.cwd(), 'public/menu-data.json');
                updateJsonFile(jsonFilePath, section, index, imageUrl);
                
            } catch (error) {
                console.error('Erreur lors du déplacement du fichier:', error);
                return res.status(500).json({ message: 'Erreur lors du déplacement du fichier' });
            }
        });

        // Envoi de la réponse après le traitement
        res.status(200).json({ images: responses });
    });
}
