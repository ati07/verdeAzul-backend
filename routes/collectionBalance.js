import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCollectionReport, deleteCollectionReport, getCollectionBalance, updateCollectionReport } from "../controllers/collectionBalance.js";
import logUserAction from "../middleware/logUserAction.js";

const CollectionBalanceRouter = Router();

CollectionBalanceRouter.post('/', auth, logUserAction('Created a Collection Report'),createCollectionReport);
CollectionBalanceRouter.get('/', auth, logUserAction('Fetched Collection Reports'),getCollectionBalance);
CollectionBalanceRouter.patch('/:collectionReportId', auth,logUserAction('Deleted a Collection Report'),deleteCollectionReport);
CollectionBalanceRouter.put('/:collectionReportId', auth, logUserAction('Updated a Collection Report'),updateCollectionReport);

export default CollectionBalanceRouter;