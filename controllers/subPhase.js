import SubPhase from '../models/subPhase.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createSubPhase= tryCatch(async (req, res) => {

  //Todo:  error handling

  let SubPhasePayload = req.body
  SubPhasePayload.addedBy = req.auth.user._id
  
  const newSubPhase= new SubPhase(SubPhasePayload);

  await newSubPhase.save()
  res.status(200).json({ success: true, message: 'SubPhase added successfully' });

})

// create getClient
export const getSubPhase= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const SubPhases = await SubPhase.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: SubPhases});
});

//  delete Client
export const deleteSubPhase= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findSubPhase={
    _id: req.params.subPhaseId
  }
  const c = await SubPhase.updateOne(findSubPhase,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'SubPhase and all the related data deleted successfully' });
});



export const updateSubPhase = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findSubPhase={
    _id: req.params.subPhaseId
  }
  const updatedSubPhase = await SubPhase.updateOne(findSubPhase,updateData)
  let message = 'SubPhase edited successfully'

  res.status(200).json({ success: true, message: message })
});

