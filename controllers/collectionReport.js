import { mail } from '../helper/mail.js';
import { createModernCollectionEmail } from '../helper/templates/cobroTemplate.js';
import { createCobroRecibidoEmail, formatCurrency } from '../helper/templates/recibidoTemplate.js';
import { ventasMail } from '../helper/ventasMail.js';
import CollectionReport from '../models/collectionReport.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

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
  CollectionReportPayload.estadoDelCobro = 'Pendiente';
  CollectionReportPayload.totalCollection = parseFloat(CollectionReportPayload.pagoCapital || 0) + parseFloat(CollectionReportPayload.intereses || 0);
  // Get last used cobro number (if any)
  const lastCobro = await CollectionReport
    .findOne({ isDelete: false })
    // .sort({ cobroNumber: -1 })
    .sort({ _id: -1 })
    .select("cobroNumber")
    .lean();

  let counter = 0;
  // console.log("lastCobro",lastCobro)
  if (lastCobro?.cobroNumber) {
    const match = lastCobro.cobroNumber.match(/\d+$/);
    if (match) {
      counter = parseInt(match[0], 10) + 1;
    }
  }

  CollectionReportPayload.cobroNumber = `${String(counter)}`;



  const newCollectionReport= new CollectionReport(CollectionReportPayload);

  await newCollectionReport.save()

  // CollectionReportPayload.subject = `Nuevo Cobro ${CollectionReportPayload.cobroNumber} por $${CollectionReportPayload.totalCollection}`;
  CollectionReportPayload.to= process.env.ACCOUNTING_EMAIL,
  CollectionReportPayload.subject= `Nuevo Cobro Creado: ${CollectionReportPayload.cobroNumber} - ${CollectionReportPayload.unitName}`,
  CollectionReportPayload.text= `Nuevo cobro creado: ${CollectionReportPayload.cobroNumber} Unidad: ${CollectionReportPayload.unitName} Monto: ${CollectionReportPayload.totalCollection}`,
  CollectionReportPayload.html = createModernCollectionEmail(CollectionReportPayload)
  
  await mail(CollectionReportPayload);
  res.status(200).json({ success: true, message: 'Collection Report added successfully' });

})

// create getClient
export const getCollectionReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

    const { cobroNumber } = req.query;
  // Add regex for partial matching if cobroNumber is provided
  if (cobroNumber) {
    findData['cobroNumber'] = { $regex: cobroNumber, $options: 'i' }; // 'i' = case-insensitive
  }

  // Date range filtering
  if (req.query.startDate || req.query.endDate) {
    findData["collectionReportDate"] = {};
    
    if (req.query.startDate) {
      findData["collectionReportDate"]["$gte"] = new Date(req.query.startDate);
    }
    
    if (req.query.endDate) {
      // Set end date to end of day
      const endDate = new Date(req.query.endDate);
      endDate.setHours(23, 59, 59, 999);
      findData["collectionReportDate"]["$lte"] = endDate;
    }
  }
  // Single date filtering (backward compatibility)
  else if (req.query.date) {
    const singleDate = new Date(req.query.date);
    findData["collectionReportDate"] = {
      $gte: singleDate,
      $lt: new Date(singleDate.getTime() + 24 * 60 * 60 * 1000) // Next day
    };
  }

  const CollectionReports = await CollectionReport.find(findData).populate([
    // { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects'},
    { path: 'bankId', model: 'banks' },
    { path:'clientId',model:'clients'},
    { path: 'userId', model: 'users' },

  ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: CollectionReports});
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
  
  if(merged.estadoDelCobro ==="Recibido" && !merged.isEmailedFromEntradas){

    // merged.subject = `Nuevo Cobro ${merged.cobroNumber} por $${merged.totalCollection}`;
    merged.to= process.env.ACCOUNTING_EMAIL,
    // merged.subject= `Nuevo Cobro Creado: ${merged.cobroNumber} - ${merged.unitName}`,
    merged.subject = `Cobro Recibido #${merged.cobroNumber} - ${merged.unitName}`;
    // merged.text= `Nuevo cobro creado: ${merged.cobroNumber} Unidad: ${merged.unitName} Monto: ${merged.totalCollection}`,
    merged.html = createCobroRecibidoEmail(merged)
  
    await mail(merged);

    let updateData = {
      $set: { isEmailedFromEntradas: true }
    }

    const updatedCollectionReport = await CollectionReport.updateOne(findCollectionReport,updateData)
  }
  let message = 'Collection Report edited successfully'

  res.status(200).json({ success: true, message: message })
});


