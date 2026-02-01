import { Router } from "express";
import auth from "../middleware/auth.js";
import { createPaymentReport, deletePaymentReport, getPaymentReport, updatePaymentReport } from "../controllers/paymentReport.js";
import logUserAction from "../middleware/logUserAction.js";

const PaymentReportRouter = Router();

PaymentReportRouter.post('/', auth, logUserAction('Created a Payment Report'),createPaymentReport);
PaymentReportRouter.get('/', auth, logUserAction('Fetched a Payment Report'),getPaymentReport);
PaymentReportRouter.patch('/:paymentReportId', auth,logUserAction('Deleted a Payment Report'),deletePaymentReport);
PaymentReportRouter.put('/:paymentReportId', auth, logUserAction('Updated a Payment Report'),updatePaymentReport);

export default PaymentReportRouter;