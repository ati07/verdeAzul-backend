import { Router } from "express";
import { deleteFile, uploadFile } from "../controllers/uploadFile.js";
import multer from "multer";
import auth from '../middleware/auth.js';
import logUserAction from "../middleware/logUserAction.js";
import fs from 'fs';


const uploadFileRouter = Router();

//multer------------------------------------------------------------

const ensureDirectoryExists = async(directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await ensureDirectoryExists("./files/");
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

uploadFileRouter.post("/",auth,logUserAction('uploaded a File'),upload.single("file"),uploadFile)
uploadFileRouter.post("/delete-file",auth,deleteFile)


export default uploadFileRouter;
