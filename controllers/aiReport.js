import Administrator from '../models/administrator.js';
import Bank from '../models/bank.js';
import CollectionReport from '../models/collectionReport.js';
import Inventory from '../models/inventory.js';
import PaymentReport from '../models/paymentReport.js';
import tryCatch from './utils/tryCatch.js';

// get cobros 
export const getCollectionReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

//   if (req.query.projectId) {
//     findData['projectId'] = req.query.projectId
//   }

  const CollectionReports = await CollectionReport.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects'},
    { path: 'bankId', model: 'banks' },
    { path:'clientId',model:'clients'},
    { path: 'userId', model: 'users' },

  ]).sort({ _id: -1 })
  .limit(20);

  res.status(200).json({ success: true, result: CollectionReports});
});


export const getAdministrator= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if (req.query.projectId) {
  //   findData['projectId'] = req.query.projectId
  // }

  const Administrators = await Administrator.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects' },
    { path: 'userId', model: 'users' },
    { path: 'categoryInTheFlowId', model: 'categoryInTheFlows' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 })
    .limit(20);;

  res.status(200).json({ success: true, result: Administrators});
});

export const getInventory= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // Fetch total count of documents
  const totalCount = await Inventory.countDocuments(findData);

  const Inventorys = await Inventory.find(findData).populate([
    // { path: 'addedBy', model: 'users' },
    { path: 'clientId', model: 'clients' },
    { path: 'projectId', model: 'projects' },
    { path: 'statusId', model: 'status' },
    { path: 'userId', model: 'users' },
    { path: 'typeId', model: 'types' }])
    .sort({ _id: -1 })
    .limit(20);

  res.status(200).json({ 
    success: true, 
    result: Inventorys,
  });
});


export const getPaymentReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const PaymentReports = await PaymentReport.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'userId', model: 'users' },
    { path: 'projectCategoryId', model: 'categoryProjects' },
    { path: 'requestedById', model:'requesteds'},
    { path: 'projectId', model: 'projects' },
    { path:'providerId',model: 'providers' },
    { path:'codeId',model: 'codes'}
  ]).sort({ _id: -1 })
  .limit(20);

  res.status(200).json({ success: true, result: PaymentReports});
});



