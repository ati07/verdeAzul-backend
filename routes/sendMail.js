import { Router } from "express";
import auth from "../middleware/auth.js";
// import { createSell, deleteSell, getSell, updateSell } from "../controllers/sell.js";
import logUserAction from "../middleware/logUserAction.js";
import { sendMail, sendMailWithAttachment } from "../controllers/sendMail.js";

const sendMailRouter = Router();
// :collectionReportId
sendMailRouter.post('/', auth,  logUserAction('Created payment for Sell'),sendMail);
sendMailRouter.post('/attachment/:collectionReportId', auth,  logUserAction('Created payment for Sell'),sendMailWithAttachment);

// sendMailRouter.get('/', auth,  logUserAction('Fetched payments of Sell Data'),getSell);
// sendMailRouter.patch('/:sellId', auth, logUserAction('Deleteded Sell payment'),deleteSell);
// sendMailRouter.put('/:sellId', auth,  logUserAction('Updated Sell payment'),updateSell);

export default sendMailRouter;

// const sendMailRouter 