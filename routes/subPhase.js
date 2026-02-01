import { Router } from "express";
import auth from "../middleware/auth.js";
import { createSubPhase, deleteSubPhase, getSubPhase, updateSubPhase } from "../controllers/subPhase.js";
import logUserAction from "../middleware/logUserAction.js";

const SubPhaseRouter = Router();

SubPhaseRouter.post('/', auth, logUserAction('Created a SubPhase'),createSubPhase);
SubPhaseRouter.get('/', auth, logUserAction('Feteched SubPhase'),getSubPhase);
SubPhaseRouter.patch('/:subPhaseId', auth,logUserAction('Deleted a SubPhase'),deleteSubPhase);
SubPhaseRouter.put('/:subPhaseId', auth, logUserAction('Updated a SubPhase'),updateSubPhase);

export default SubPhaseRouter;