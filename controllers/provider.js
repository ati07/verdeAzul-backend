import Provider from '../models/provider.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

const REQUIRED_FIELDS = [
    "name",
    "phoneNumber", // Assuming phone number as a string to handle different formats
    // email: { type: String, required: true, unique: true },
    "email",
    "serviceType",
    "contactPerson",
    "projectId",
    "snCode",
    "snName"
];
// create Client
export const createProvider= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ProviderPayload = req.body
  ProviderPayload.addedBy = req.auth.user._id
  
  ProviderPayload.isComplete = computeIsComplete(ProviderPayload,REQUIRED_FIELDS);

  const newProvider= new Provider(ProviderPayload);

  await newProvider.save()
  res.status(200).json({ success: true, message: 'Provider added successfully' });

})

// create getClient
export const getProvider= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }
  // if (req.query.snName) {
  //   findData['snName'] = req.query.snName
  // }
  
  const { snName } = req.query;
  // Add regex for partial matching if snName is provided
  if (snName) {
    findData['snName'] = { $regex: snName, $options: 'i' }; // 'i' = case-insensitive
  }
  
  const Providers = await Provider.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ snName: 1 });


  res.status(200).json({ success: true, result: Providers});
});

//  delete Client
export const deleteProvider= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findProvider={
    _id: req.params.providerId
  }
  const c = await Provider.updateOne(findProvider,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Provider and all the related data deleted successfully' });
});



export const updateProvider= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await Provider.findById(req.params.providerId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }
  // let updateData = {
  //   $set: req.body
  // }
  let findProvider={
    _id: req.params.providerId
  }
  const updatedProvider = await Provider.updateOne(findProvider,updateData)
  let message = 'Provider edited successfully'

  res.status(200).json({ success: true, message: message })
});

