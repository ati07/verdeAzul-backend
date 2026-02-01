import { Router } from "express";
import auth from "../middleware/auth.js";
import { createBank, deleteBank, getBank, updateBank } from "../controllers/bank.js";
import logUserAction from "../middleware/logUserAction.js";

const BankRouter = Router();
// auth,
BankRouter.post('/', auth, logUserAction('Created Bank detail'), createBank);
BankRouter.get('/', auth, logUserAction('Fetched Bank Detail'), getBank);
BankRouter.patch('/:bankId', auth, logUserAction(' Deleted a Bank detail'), deleteBank);
BankRouter.put('/:bankId', auth, logUserAction('Updated a Bank detail'), updateBank);

export default BankRouter;