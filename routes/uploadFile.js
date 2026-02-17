import { Router } from "express";
import { deleteFile, uploadFile } from "../controllers/uploadFile.js";
import multer from "multer";
import auth from '../middleware/auth.js';
import logUserAction from "../middleware/logUserAction.js";
import fs from 'fs';
import path from 'path';

const uploadFileRouter = Router();

//multer------------------------------------------------------------

const ensureDirectoryExists = async(directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

// const storage = multer.diskStorage({
//   destination: async function (req, file, cb) {
//     await ensureDirectoryExists("./files/");
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const title = req.body.title;
    // const folder = title === 'contractFilepath' ? 'contract'
    //              : title === 'identificationFilepath' ? 'identification'
    //              : '';
    const folder = title
    const dir = path.join(process.cwd(), 'files', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g,'_');
    cb(null, safe);
  }
});
export const upload = multer({ storage });

uploadFileRouter.post("/",auth,logUserAction('uploaded a File'),upload.single("file"),uploadFile)
uploadFileRouter.post("/delete-file",auth,deleteFile)


export default uploadFileRouter;
