import Administrator from '../models/administrator.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

const REQUIRED_FIELDS = [
  'providerId',
  'userId',
  'projectId',
  'categoryInTheFlowId',
  'week',
  'date',
  'bin',
  'total',
  'invoiceDescription',
  'comment',
  'observation'
];


// create Client
export const createAdministrator= tryCatch(async (req, res) => {

  //Todo:  error handling

  let administratorPayload = req.body
  administratorPayload.addedBy = req.auth.user._id


  // compute completeness before saving
  administratorPayload.isComplete = computeIsComplete(administratorPayload,REQUIRED_FIELDS);
  
  const newAdministrator= new Administrator(administratorPayload);

  await newAdministrator.save()
  res.status(200).json({ success: true, message: 'Administrator added successfully' });

})

// create getClient
export const getAdministrator= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  const Administrators = await Administrator.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects' },
    { path: 'userId', model: 'users' },
    { path: 'categoryInTheFlowId', model: 'categoryInTheFlows' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Administrators});
});

//  delete Client
export const deleteAdministrator= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findAdministrator={
    _id: req.params.administratorId
  }
  const c = await Administrator.updateOne(findAdministrator,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Administrator and all the related data deleted successfully' });
});



export const updateAdministrator= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await Administrator.findById(req.params.administratorId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }
  // let updateData = {
  //   $set: req.body
  // }
  let findAdministrator={
    _id: req.params.administratorId
  }
  const updatedAdministrator = await Administrator.updateOne(findAdministrator,updateData)
  let message = 'Administrator edited successfully'

  res.status(200).json({ success: true, message: message })
});

