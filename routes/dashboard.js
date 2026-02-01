import express from 'express';
import { getIncompleteCounts } from '../controllers/dashboard.js';
const dashboardRouter = express.Router();

dashboardRouter.get('/incomplete-counts', getIncompleteCounts);

export default dashboardRouter;