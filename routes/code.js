import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCode, deleteCode, getCode, updateCode } from "../controllers/code.js";
import logUserAction from "../middleware/logUserAction.js";

const CodeRouter = Router();

CodeRouter.post('/', auth, logUserAction('Created a Code'),createCode);
CodeRouter.get('/', auth, logUserAction('Fetched Codes'),getCode);
CodeRouter.patch('/:codeId', auth,logUserAction('Deleted a Code'),deleteCode);
CodeRouter.put('/:codeId', auth, logUserAction('Update a Code'),updateCode);

export default CodeRouter;