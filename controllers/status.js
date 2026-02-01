import Status from '../models/status.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createStatus= tryCatch(async (req, res) => {

  //Todo:  error handling

  let StatusPayload = req.body
  StatusPayload.addedBy = req.auth.user._id
  
  const newStatus= new Status(StatusPayload);

  await newStatus.save()
  res.status(200).json({ success: true, message: 'Status added successfully' });

})

// create getClient
export const getStatus= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Statuss = await Status.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Statuss});
});

//  delete Client
export const deleteStatus= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findStatus={
    _id: req.params.statusId
  }
  const c = await Status.updateOne(findStatus,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Status and all the related data deleted successfully' });
});



export const updateStatus = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findStatus={
    _id: req.params.statusId
  }
  const updatedStatus = await Status.updateOne(findStatus,updateData)
  let message = 'Status edited successfully'

  res.status(200).json({ success: true, message: message })
});

