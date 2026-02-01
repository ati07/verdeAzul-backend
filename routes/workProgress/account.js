import { Router } from "express";
import auth from "../../middleware/auth.js";
import { createAccount, deleteAccount, getAccount, updateAccount } from "../../controllers/workProgress/account.js";
import logUserAction from "../../middleware/logUserAction.js";

const accountRouter = Router();

accountRouter.post('/:id', auth,  logUserAction('Added row in Avance de obra'),createAccount);
accountRouter.get('/:id', auth,  logUserAction('Fetched Avance de obra Data'),getAccount);
accountRouter.patch('/:id/:accountId', auth, logUserAction('Deleteded Avance de obra'),deleteAccount);
accountRouter.put('/:id/:accountId', auth,  logUserAction('Updated Avance de obra'),updateAccount);

export default accountRouter;