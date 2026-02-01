import PaymentReport from '../models/paymentReport.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

const REQUIRED_FIELDS = [
          "projectId" ,
          "providerId" ,
          "projectCategoryId",
          "codeId",
          "subFase",
          "userId",
          "requestedById",
          "week",
          "date",
          "total",
          "invoiceDescription",
          "comment",
          "orderNo"
];

// create Client
export const createPaymentReport= tryCatch(async (req, res) => {

  //Todo:  error handling

  let PaymentReportPayload = req.body
  PaymentReportPayload.addedBy = req.auth.user._id
  
  PaymentReportPayload.isComplete = computeIsComplete(PaymentReportPayload,REQUIRED_FIELDS);

  const newPaymentReport= new PaymentReport(PaymentReportPayload);

  await newPaymentReport.save()
  res.status(200).json({ success: true, message: 'Payment Report added successfully' });

})

// create getClient
export const getPaymentReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if (req.query.projectId) {
  //   findData['clientId'] = req.query.clientId
  // }

  if (req.query.providerId) {
    findData['providerId'] = req.query.providerId
  }

  const PaymentReports = await PaymentReport.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'userId', model: 'users' },
    { path: 'projectCategoryId', model: 'categoryProjects' },
    { path: 'requestedById', model:'requesteds'},
    { path: 'projectId', model: 'projects' },
    { path:'providerId',model: 'providers' },
    { path:'codeId',model: 'codes'}
  ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: PaymentReports});
});

//  delete Client
export const deletePaymentReport= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findPaymentReport={
    _id: req.params.paymentReportId
  }
  const c = await PaymentReport.updateOne(findPaymentReport,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'PaymentReport and all the related data deleted successfully' });
});



export const updatePaymentReport= tryCatch(async (req, res) => {
  // fetch existing document to compute final completeness
  const existing = await PaymentReport.findById(req.params.paymentReportId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }
  
  
  
  // let updateData = {
  //   $set: req.body
  // }
  let findPaymentReport={
    _id: req.params.paymentReportId
  }
  const updatedPaymentReport = await PaymentReport.updateOne(findPaymentReport,updateData)
  let message = 'PaymentReport edited successfully'

  res.status(200).json({ success: true, message: message })
});

