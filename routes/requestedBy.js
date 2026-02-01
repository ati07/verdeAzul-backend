import { Router } from "express";
import auth from "../middleware/auth.js";
// import { createProject, deleteProject, getProject, updateProject } from "../controllers/project.js";
import logUserAction from "../middleware/logUserAction.js";
import { createRequestedBy, deleteRequestedBy, getRequestedBy, updateRequestedBy } from "../controllers/requestedBy.js";

const RequestedByRouter = Router();
// auth,
RequestedByRouter.post('/', auth, logUserAction('Created a RequestedBy'),createRequestedBy);
RequestedByRouter.get('/', auth, logUserAction('Fetched RequestedBy'),getRequestedBy);
RequestedByRouter.patch('/:requestedById', auth,logUserAction('Deleted a RequestedBy'),deleteRequestedBy);
RequestedByRouter.put('/:requestedById', auth, logUserAction('Updated a RequestedBy'),updateRequestedBy);

export default RequestedByRouter;