import { Router } from "express";
import auth from "../middleware/auth.js";
import { createAdministrator, deleteAdministrator, getAdministrator, updateAdministrator } from "../controllers/administrator.js";
import logUserAction from "../middleware/logUserAction.js";

const AdministratorRouter = Router();

AdministratorRouter.post('/', auth,  logUserAction('Created payment for Administrator'),createAdministrator);
AdministratorRouter.get('/', auth,  logUserAction('Fetched payments of Administrotor Data'),getAdministrator);
AdministratorRouter.patch('/:administratorId', auth, logUserAction('Deleteded Administrator payment'),deleteAdministrator);
AdministratorRouter.put('/:administratorId', auth,  logUserAction('Updated Administrator payment'),updateAdministrator);

export default AdministratorRouter;