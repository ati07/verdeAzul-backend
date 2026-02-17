import tryCatch from "./utils/tryCatch.js";
import fs from 'fs';

const ensureDirectoryExists = async(directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

export const uploadFile = tryCatch(async (req, res) => {
    // console.log("File uploaded:", req.file)
    const title = req.body.title;
    const fileName = req.file.filename; // Corrected: multer uses 'filename' not 'fileName'

    let directoryPath = `./files/`+ title + '/';

    // if(title==="contractFilepath"){
    //     directoryPath += 'contract/'
    // }

    // if(title==="identificationFilepath"){
    //     directoryPath += 'identification/'
    // }

    await ensureDirectoryExists(directoryPath);

    if (req.body.oldFileName && req.body.oldFileName !== '') {
        // Extract just the filename if the path includes directories
        const oldFileName = req.body.oldFileName.split('/').pop().split('\\').pop();

        fs.unlink(directoryPath + oldFileName, (err) => {
            if (err) {
                console.log("Could not delete old file: " + err);
            }
        });
    }
    res.status(200).json({ success: true, result: { title, fileName } });

})

// export const deleteFile = tryCatch(async (req, res) => {
//     const fileName = req.body.file;
//     const directoryPath = "./files/";

//     await ensureDirectoryExists(directoryPath);

//     if (fileName && fileName !== '') {
//         fs.unlink(directoryPath + fileName, (err) => {
//             if (err) {
//                 console.log("Could not delete file: " + err);
//                 return res.status(500).send({
//                     message: "Could not delete the file. " + err,
//                 });
//             }
//         });
//     }

//     res.status(200).json({ success: true });
// })

export const deleteFile = tryCatch(async (req, res) => {
  const fileName = req.body.file;
  const folder = req.body.folder; // 'contract' or 'identification'
  const allowed = ['contract','identification'];
  if (!allowed.includes(folder)) return res.status(400).json({ success:false, message:'Invalid folder' });
  const fullPath = path.join(process.cwd(), 'files', folder, fileName);
  try {
    await fs.promises.unlink(fullPath);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});