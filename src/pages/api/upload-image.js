import fs from 'fs';
import path from 'path';
import sharp from 'sharp';  // Importer sharp
import { IncomingForm } from 'formidable';
import { getSession } from 'next-auth/react';

export const config = {
    api: {
        bodyParser: false,
    },
};

const updateJsonFile = (filePath, section, index, imageUrl) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const menuSection = data[section];

        if (Array.isArray(menuSection)) {
            if (menuSection[index]) {
                menuSection[index].imageUrl = imageUrl;
            } else {
                console.error('Index non trouvé dans le tableau');
            }
        } else if (menuSection && menuSection.images) {
            if (menuSection.images[index]) {
                menuSection.images[index].src = imageUrl;
            } else {
                console.error('Index non trouvé dans l\'objet images');
            }
        } else {
            console.error('La section ou l\'index n\'a pas été trouvé dans le fichier JSON');
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier JSON:', error);
    }
};

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
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
                return res.status(400).json({ message: 'Aucun fichier valide fourni' });
            }

            try {
                const uploadDir = path.join(process.cwd(), 'public', 'images', 'upload', section);

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const fileName = `image-${index}-${i}${path.extname(originalFilename)}`;
                const destinationPath = path.join(uploadDir, fileName);

                // Redimensionner l'image avec sharp
                sharp(filePath)
                    .resize({ width: 600, height: 600, fit: 'inside' })  // Redimensionnez selon les dimensions désirées
                    .toFile(destinationPath, (err, info) => {
                        if (err) {
                            console.error('Erreur lors du redimensionnement de l\'image:', err);
                            return res.status(500).json({ message: 'Erreur lors du redimensionnement de l\'image' });
                        }

                        const imageUrl = `/images/upload/${section}/${fileName}`;
                        responses.push({ imageUrl });

                        const jsonFilePath = path.join(process.cwd(), 'public/menu-data.json');
                        updateJsonFile(jsonFilePath, section, index, imageUrl);

                        // Si toutes les images ont été traitées, envoyer la réponse
                        if (responses.length === filesArray.length) {
                            res.status(200).json({ images: responses });
                        }
                    });

            } catch (error) {
                return res.status(500).json({ message: 'Erreur lors du traitement du fichier' });
            }
        });
    });
}
