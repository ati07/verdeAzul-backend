import { Router } from "express";
import auth from "../middleware/auth.js";
import { createSell, deleteSell, getSell, updateSell } from "../controllers/sell.js";
import logUserAction from "../middleware/logUserAction.js";

const SellRouter = Router();

SellRouter.post('/', auth,  logUserAction('Created payment for Sell'),createSell);
SellRouter.get('/', auth,  logUserAction('Fetched payments of Sell Data'),getSell);
SellRouter.patch('/:sellId', auth, logUserAction('Deleteded Sell payment'),deleteSell);
SellRouter.put('/:sellId', auth,  logUserAction('Updated Sell payment'),updateSell);

export default SellRouter;