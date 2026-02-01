// import Project from '../models/project.js';
import RequestedBy from '../models/requestedBy.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createRequestedBy= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ProjectPayload = req.body
  ProjectPayload.addedBy = req.auth.user._id
  
  const newProject= new RequestedBy(ProjectPayload);

  await newProject.save()
  res.status(200).json({ success: true, message: 'RequestedBy added successfully' });

})

// create getClient
export const getRequestedBy= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const RequestedBys = await RequestedBy.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: RequestedBys});
});

//  delete Client
export const deleteRequestedBy= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findProject={
    _id: req.params.requestedById
  }
  const c = await RequestedBy.updateOne(findProject,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Project and all the related data deleted successfully' });
});



export const updateRequestedBy = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findProject={
    _id: req.params.requestedById
  }
  const updatedProject = await RequestedBy.updateOne(findProject,updateData)
  let message = 'RequestedBy edited successfully'

  res.status(200).json({ success: true, message: message })
});

