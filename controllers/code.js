import Code from '../models/code.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createCode= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CodePayload = req.body
  CodePayload.addedBy = req.auth.user._id
  
  const newCode= new Code(CodePayload);

  await newCode.save()
  res.status(200).json({ success: true, message: 'Code added successfully' });

})

// create getClient
export const getCode= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Codes = await Code.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Codes});
});

//  delete Client
export const deleteCode= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCode={
    _id: req.params.codeId
  }
  const c = await Code.updateOne(findCode,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Code and all the related data deleted successfully' });
});



export const updateCode = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findCode={
    _id: req.params.codeId
  }
  const updatedCode = await Code.updateOne(findCode,updateData)
  let message = 'Code edited successfully'

  res.status(200).json({ success: true, message: message })
});

