// import Administrator from '../models/administrator.js';
// import CollectionReport from '../models/collectionReport.js';
// import Inventory from '../models/inventory.js';
// import PaymentReport from '../models/paymentReport.js';
// import Provider from '../models/provider.js';
import Client from "../models/client.js"
import tryCatch from './utils/tryCatch.js';



export const getIncompleteCounts = tryCatch(async (req, res) => {
  const activeFilters = { statusCliente:"Activo", isDelete: false };
  const incompleteFilters = { statusCliente:"Activo", isComplete: false, isDelete: false };

  const [
    activeClientCount,
    TotalClient,
    // collectionReportCount,
    // paymentReportCount,
  ] = await Promise.all([
    // Administrator.countDocuments(filters),
    // CollectionReport.countDocuments(filters),
    // PaymentReport.countDocuments(filters),
    Client.countDocuments(activeFilters),
    Client.countDocuments(incompleteFilters)

  ]);

  res.status(200).json({
    success: true,
    result: {
      // administrator: administratorCount,
      // collectionReport: collectionReportCount,
      // paymentReport: paymentReportCount,
      activeClient:activeClientCount,
      incompleteClient:TotalClient
    }
  });
});