import { mail } from '../helper/mail.js';
import CollectionReport from '../models/collectionReport.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';
import Ventas from '../models/ventas.js';
// import { id } from 'date-fns/locale';

const REQUIRED_FIELDS = [
  'projectId',
  'bankId',
  'clientId',
  'userId',
  'reportDate',
  'unitName',
  'collectionReportDate',
  'entryDate',
  'totalCollection',
  'typeOfPayment',
  'paymentDate',
  'observation'
];


// create Client
export const createCollectionReport= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CollectionReportPayload = req.body
  CollectionReportPayload.addedBy = req.auth.user._id
  

  // compute completeness before saving
  CollectionReportPayload.isComplete = computeIsComplete(CollectionReportPayload,REQUIRED_FIELDS);
  CollectionReportPayload.estadoDelCobro = 'No Recibo';

  // Get last used cobro number (if any)
  const lastCobro = await CollectionReport
    .findOne({ isDelete: false })
    // .sort({ cobroNumber: -1 })
    .sort({ _id: -1 })
    .select("cobroNumber")
    .lean();

  let counter = 0;
  console.log("lastCobro",lastCobro)
  if (lastCobro?.cobroNumber) {
    const match = lastCobro.cobroNumber.match(/\d+$/);
    if (match) {
      counter = parseInt(match[0], 10) + 1;
    }
  }

  CollectionReportPayload.cobroNumber = `COBRO-${String(counter)}`;



  const newCollectionReport= new CollectionReport(CollectionReportPayload);

  await newCollectionReport.save()

  await mail(CollectionReportPayload);
  res.status(200).json({ success: true, message: 'Collection Report added successfully' });

})

// create getClient

export const getCollectionBalance= tryCatch(async (req, res) => {

  // Build collection filter
  let collectionFilter = {
    isDelete: false
  }

  if (req.query.projectId) {
    collectionFilter['projectId'] = req.query.projectId
  }
  if (req.query.clientId) {
    collectionFilter['clientId'] = req.query.clientId
  }
  // Get all collection reports
  const CollectionReports = await CollectionReport.find(collectionFilter).populate([
    { path: 'projectId', model: 'projects'},
    { path: 'bankId', model: 'banks' },
    { path: 'clientId',model:'clients'},
    { path: 'userId', model: 'users' },
  ]).lean();

  // Build ventas filter
  let ventasFilter = {
    isDelete: false
  }

  if (req.query.projectId) {
    ventasFilter['projectId'] = req.query.projectId
  }
  if (req.query.clientId) {
    ventasFilter['clientId'] = req.query.clientId
  }

  // Get all ventas
  const ventasData = await Ventas.find(ventasFilter).populate([
    { path: 'projectId', model: 'projects'},
    { path: 'clientId', model: 'clients'},
    { path: 'userId', model: 'users' },
  ]).lean();

  // Group collections by clientId, projectId, unitName
  const collectionMap = {};
  CollectionReports.forEach(report => {
    const key = `${report?.clientId._id}_${report?.projectId._id}_${report.unitName}`;
    // console.log("report",report.clientId.name,report.recibido)
    if (!collectionMap[key]) {
      collectionMap[key] = {
        id: report._id,
        clientId: report.clientId,
        projectId: report.projectId,
        unitName: report.unitName,
        totalRecibido: 0,
        totalIntereses:0,
        collectionCount: 0,
        collections: []
      };
    }
    const recibido = parseFloat(report.recibido) || 0;
    const intereses = parseFloat(report.intereses) || 0;
    collectionMap[key].totalRecibido += recibido;
    collectionMap[key].totalIntereses += intereses;
    collectionMap[key].collectionCount += 1;
    collectionMap[key].collections.push(report);
  });

  // console.log("collectionMap",collectionMap);
  // Map ventas by clientId, projectId, unitName (unique combinations)
  const ventasMap = {};
  ventasData.forEach(venta => {
    const key = `${venta.clientId._id}_${venta.projectId._id}_${venta.unitName}`;
    ventasMap[key] = {
      id: venta?._id,
      clientId: venta?.clientId,
      projectId: venta?.projectId,
      unitName: venta?.unitName,
      precioVenta: venta?.precioVenta,
      intereses: venta?.intereses,
      totalVentas: parseFloat(venta.precioTotalVenta) || 0,
      ventasCount: 1
    };
  });

  // console.log("ventasMap",ventasMap);
  // Calculate balance for each group
  const result = [];
  
  // Process all groups from collections
  Object.entries(collectionMap).forEach(([key, collectionData]) => {
    // const ventasData = ventasMap[key] || { totalVentas: 0, ventasCount: 0 };
    const ventasData = ventasMap[key];
    // console.log("collectionData",collectionData)
    if(ventasData){
      // const balance = ventasData.totalVentas - collectionData.totalCollection;
      const totalCapital = collectionData.totalRecibido - collectionData.totalIntereses
      // console.log("datatesting",ventasData.totalVentas, totalCapital, collectionData.totalRecibido, collectionData.totalIntereses)
      const balance = ventasData.totalVentas - totalCapital - collectionData.totalIntereses
      
      const saldoCapital = ventasData.precioVenta - totalCapital
      const saldoIntereses = ventasData.intereses - collectionData.totalIntereses
      
      result.push({
        id: collectionData.id,
        clientId: collectionData.clientId,
        projectId: collectionData.projectId,
        unitName: collectionData.unitName,
        precioVenta: ventasData.precioVenta,
        intereses: ventasData.intereses,
        precioTotalVenta: ventasData.totalVentas,
        totalRecibido: collectionData.totalRecibido,
        totalCapital: totalCapital,
        totalIntereses: collectionData.totalIntereses,
        balance: balance,
        ventasCount: ventasData.ventasCount,
        collectionCount: collectionData.collectionCount,
        saldoCapital,
        saldoIntereses
      });
    }


  });

  // Add ventas that have no collections
  let ventasWithoutCollections = 0;
  Object.entries(ventasMap).forEach(([key, ventasData]) => {
    // Check if this venta key already exists in collectionMap
    if (!collectionMap[key]) {
      ventasWithoutCollections++;
      result.push({
        id: ventasData.id,
        clientId: ventasData.clientId,
        projectId: ventasData.projectId,
        unitName: ventasData.unitName,
        precioVenta: ventasData.precioVenta,
        intereses: ventasData.intereses,
        precioTotalVenta: ventasData.totalVentas,
        totalRecibido: 0,
        totalCapital: 0,
        totalIntereses: 0,
        balance: ventasData.totalVentas,
        ventasCount: ventasData.ventasCount,
        collectionCount: 0,
        saldoCapital: 0,
        saldoIntereses: 0
      });
    }
  });

  // console.log("collectionMap keys:", Object.keys(collectionMap).length);
  // console.log("ventasMap keys:", Object.keys(ventasMap).length);
  // console.log("ventas without collections:", ventasWithoutCollections);
  // console.log("result length:", result.length);
  // Calculate summary
  const summary = {
    // totalVentas: result.reduce((sum, item) => sum + item.totalVentas, 0),
    // totalCollection: result.reduce((sum, item) => sum + item.totalCollection, 0),
    // totalBalance: result.reduce((sum, item) => sum + item.balance, 0)
  };

  res.status(200).json({ success: true, result, summary });
});

//  delete Client
export const deleteCollectionReport= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCollectionReport={
    _id: req.params.collectionReportId
  }
  const c = await CollectionReport.updateOne(findCollectionReport,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Collection Report and all the related data deleted successfully' });
});



export const updateCollectionReport= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await CollectionReport.findById(req.params.collectionReportId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }

  // let updateData = {
  //   $set: req.body
  // }
  let findCollectionReport={
    _id: req.params.collectionReportId
  }
  const updatedCollectionReport = await CollectionReport.updateOne(findCollectionReport,updateData)
  let message = 'Collection Report edited successfully'

  res.status(200).json({ success: true, message: message })
});

