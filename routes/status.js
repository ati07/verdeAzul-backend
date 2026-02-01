import { Router } from "express";
import auth from "../middleware/auth.js";
import { createStatus, deleteStatus, getStatus, updateStatus } from "../controllers/status.js";
import logUserAction from "../middleware/logUserAction.js";

const StatusRouter = Router();
// auth,
StatusRouter.post('/', auth, logUserAction('Created a Status'),createStatus);
StatusRouter.get('/', auth, logUserAction('Fetched Status'),getStatus);
StatusRouter.patch('/:statusId', auth,logUserAction('Deleted a Status'),deleteStatus);
StatusRouter.put('/:statusId', auth, logUserAction('Updated a Status'),updateStatus);

export default StatusRouter;