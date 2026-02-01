import { Router } from "express";
import auth from "../../middleware/auth.js";
import { createWorkProgress, deleteWorkProgress, getWorkProgress, updateWorkProgress } from "../../controllers/workProgress/workProgress.js";
import logUserAction from "../../middleware/logUserAction.js";

const workProgressRouter = Router();

workProgressRouter.post('/', auth,  logUserAction('Added row in Avance de obra'),createWorkProgress);
workProgressRouter.get('/', auth,  logUserAction('Fetched Avance de obra Data'),getWorkProgress);
workProgressRouter.patch('/:workProgressId', auth, logUserAction('Deleteded Avance de obra'),deleteWorkProgress);
workProgressRouter.put('/:workProgressId', auth,  logUserAction('Updated Avance de obra'),updateWorkProgress);

export default workProgressRouter;