import Client from '../models/client.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createClient = tryCatch(async (req, res) => {

  //Todo:  error handling

  let clientPayload = req.body
  
  // if(req.auth.user.role == 'Partner' ){
  //   clientPayload.partnerId = req.auth.user._id
  // }
  clientPayload.addedBy = req.auth.user._id

  const newClient = new Client(clientPayload);

  await newClient.save()
  res.status(200).json({ success: true, message: 'Client added successfully' });

})

// create getClient
export const getClient = tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if(req.auth.user.role == 'Partner' ){
  //   findData.partnerId = req.auth.user._id
  // }
  const { name } = req.query;
  // Add regex for partial matching if snName is provided
  if (name) {
    findData['name'] = { $regex: name, $options: 'i' }; // 'i' = case-insensitive
  }

  const client = await Client.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: client });
});

//  delete Client
export const deleteClient = tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findClient={
    _id: req.params.clientId
  }
  const c = await Client.updateOne(findClient,updateData);
  let findData={
    clientId: req.params.clientId
  }
  
  res.status(200).json({ success: true, message: 'Client and all the related data deleted successfully' });
});



export const updateClient = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findClient={
    _id: req.params.clientId
  }
  const updatedClient = await Client.updateOne(findClient,updateData)
  let message = 'Client edited successfully'
 
  if (req.body.isActive ===false || req.body.isActive ===true) {
    let findData = {
      clientId : req.params.clientId
    }
    // const updatedMerchant = await Merchant.updateMany(findData,updateData)
    // const updatedMerchantAccount = await MerchantAccount.updateMany(findData,updateData)
    console.log('req.body.isActive',req.body.isActive)
    message = "Client status updated successfully and all its data are updated"
  }
  res.status(200).json({ success: true, message: message })
});

