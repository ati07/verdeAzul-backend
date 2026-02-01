import { Router } from "express";
import auth from "../../middleware/auth.js";
import { createProject, deleteProject, getProject, updateProject } from "../../controllers/workProgress/projectWorkProgress.js";
import logUserAction from "../../middleware/logUserAction.js";

const projectWorkProgressRouter = Router();
// auth,
projectWorkProgressRouter.post('/', auth, logUserAction('Created a Project'),createProject);
projectWorkProgressRouter.get('/', auth, logUserAction('Fetched Project'),getProject);
projectWorkProgressRouter.patch('/:projectId', auth,logUserAction('Deleted a Project'),deleteProject);
projectWorkProgressRouter.put('/:projectId', auth, logUserAction('Updated a Project'),updateProject);

export default projectWorkProgressRouter;