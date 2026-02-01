import { Router } from "express";
import auth from "../middleware/auth.js";
import logUserAction from "../middleware/logUserAction.js";
import { getAdministrator, getCollectionReport, getInventory, getPaymentReport } from "../controllers/aiReport.js";

const AiReportRouter = Router();


AiReportRouter.get('/collection-reports', auth, logUserAction('Fetched Collection Reports'),getCollectionReport);
AiReportRouter.get('/administrator-reports', auth, logUserAction('Fetched Collection Reports'),getAdministrator);
AiReportRouter.get('/inventory-reports', auth, logUserAction('Fetched Collection Reports'),getInventory);
AiReportRouter.get('/payment-reports', auth, logUserAction('Fetched Payment Reports'),getPaymentReport);



export default AiReportRouter