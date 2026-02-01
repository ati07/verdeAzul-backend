import Type from '../models/type.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createType= tryCatch(async (req, res) => {

  //Todo:  error handling

  let TypePayload = req.body
  TypePayload.addedBy = req.auth.user._id
  
  const newType= new Type(TypePayload);

  await newType.save()
  res.status(200).json({ success: true, message: 'Type added successfully' });

})

// create getClient
export const getType= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Types = await Type.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Types});
});

//  delete Client
export const deleteType= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findType={
    _id: req.params.typeId
  }
  const c = await Type.updateOne(findType,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Type and all the related data deleted successfully' });
});



export const updateType = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findType={
    _id: req.params.typeId
  }
  const updatedType = await Type.updateOne(findType,updateData)
  let message = 'Type edited successfully'

  res.status(200).json({ success: true, message: message })
});

