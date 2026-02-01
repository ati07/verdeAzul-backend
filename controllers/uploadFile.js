import tryCatch from "./utils/tryCatch.js";
import fs from 'fs';

const ensureDirectoryExists = async(directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

export const uploadFile = tryCatch(async (req, res) => {
    console.log("File uploaded:", req.file)
    const title = req.body.title;
    const fileName = req.file.filename; // Corrected: multer uses 'filename' not 'fileName'
    const directoryPath = "./files/";

    await ensureDirectoryExists(directoryPath);

    if (req.body.oldFileName && req.body.oldFileName !== '') {
        const oldFileName = req.body.oldFileName;

        fs.unlink(directoryPath + oldFileName, (err) => {
            if (err) {
                console.log("Could not delete old file: " + err);
            }
        });
    }
    res.status(200).json({ success: true, result: { title, fileName } });

})

export const deleteFile = tryCatch(async (req, res) => {
    const fileName = req.body.file;
    const directoryPath = "./files/";

    await ensureDirectoryExists(directoryPath);

    if (fileName && fileName !== '') {
        fs.unlink(directoryPath + fileName, (err) => {
            if (err) {
                console.log("Could not delete file: " + err);
                return res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        });
    }

    res.status(200).json({ success: true });
})