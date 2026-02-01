import Administrator from '../models/administrator.js';
import CollectionReport from '../models/collectionReport.js';
import Inventory from '../models/inventory.js';
import PaymentReport from '../models/paymentReport.js';
import Provider from '../models/provider.js';
import tryCatch from './utils/tryCatch.js';



export const getIncompleteCounts = tryCatch(async (req, res) => {
  const filters = { isComplete: false, isDelete: false };

  const [
    administratorCount,
    collectionReportCount,
    paymentReportCount,
  ] = await Promise.all([
    Administrator.countDocuments(filters),
    CollectionReport.countDocuments(filters),
    PaymentReport.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    result: {
      administrator: administratorCount,
      collectionReport: collectionReportCount,
      paymentReport: paymentReportCount,
    }
  });
});