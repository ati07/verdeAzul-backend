import { Router } from "express";
import auth from "../middleware/auth.js";
import { createType, deleteType, getType, updateType } from "../controllers/type.js";
import logUserAction from "../middleware/logUserAction.js";

const TypeRouter = Router();
// auth,
TypeRouter.post('/', auth, logUserAction('Created a Type'),createType);
TypeRouter.get('/', auth, logUserAction('Fetched Type'),getType);
TypeRouter.patch('/:TypeId', auth,logUserAction('Deleted a Type'),deleteType);
TypeRouter.put('/:TypeId', auth, logUserAction('Updated a Type'),updateType);

export default TypeRouter;