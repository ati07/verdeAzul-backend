import { Router } from "express";
import auth from "../middleware/auth.js";
import logUserAction from "../middleware/logUserAction.js";
import { getAdministrator, getCollectionReport, getInventory, getPaymentReport, getVentas } from "../controllers/aiReport.js";
import { getCollectionBalance } from "../controllers/collectionBalance.js";
import { getProfitability } from "../controllers/profitability.js";
import { getFinancials } from "../controllers/repaymentAndDisbursements.js";
import { getClient } from "../controllers/client.js";
import { getProject } from "../controllers/project.js";
import { getUsers } from "../controllers/user.js";
import { getProvider } from "../controllers/provider.js";

const AiReportRouter = Router();


AiReportRouter.get('/collection-reports', auth, logUserAction('Fetched Collection Reports'),getCollectionReport);
AiReportRouter.get('/administrator-reports', auth, logUserAction('Fetched Administrator Reports'),getAdministrator);
AiReportRouter.get('/inventory-reports', auth, logUserAction('Fetched Inventory Reports'),getInventory);
AiReportRouter.get('/payment-reports', auth, logUserAction('Fetched Payment Reports'),getPaymentReport);
AiReportRouter.get('/sales-reports', auth, logUserAction('Fetched Sales Reports'),getVentas);
AiReportRouter.get('/balance', auth, logUserAction('Fetched Balance Reports'),getCollectionBalance);
AiReportRouter.get('/balance', auth, logUserAction('Fetched Balance Reports'),getCollectionBalance);
AiReportRouter.get('/profitability', auth, logUserAction('Fetched Profitability Reports'),getProfitability);
AiReportRouter.get('/repayment', auth, logUserAction('Fetched Repayment Reports'),getFinancials);
AiReportRouter.get('/client-reports', auth, logUserAction('Fetched Client Reports'),getClient);
AiReportRouter.get('/project', auth, logUserAction('Fetched Project Reports'),getProject);
AiReportRouter.get('/user', auth, logUserAction('Fetched User Reports'),getUsers);
AiReportRouter.get('/provider', auth, logUserAction('Fetched Provider Reports'),getProvider);


export default AiReportRouter