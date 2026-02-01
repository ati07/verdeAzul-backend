import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCollectionReport, deleteCollectionReport, getCollectionReport, updateCollectionReport } from "../controllers/collectionReport.js";
import logUserAction from "../middleware/logUserAction.js";

const CollectionReportRouter = Router();

CollectionReportRouter.post('/', auth, logUserAction('Created a Collection Report'),createCollectionReport);
CollectionReportRouter.get('/', auth, logUserAction('Fetched Collection Reports'),getCollectionReport);
CollectionReportRouter.patch('/:collectionReportId', auth,logUserAction('Deleted a Collection Report'),deleteCollectionReport);
CollectionReportRouter.put('/:collectionReportId', auth, logUserAction('Updated a Collection Report'),updateCollectionReport);

export default CollectionReportRouter;