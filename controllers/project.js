import Project from '../models/project.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createProject= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ProjectPayload = req.body
  ProjectPayload.addedBy = req.auth.user._id
  
  const newProject= new Project(ProjectPayload);

  await newProject.save()
  res.status(200).json({ success: true, message: 'Project added successfully' });

})

// create getClient
export const getProject= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const { name } = req.query;
  // Add regex for partial matching if snName is provided
  if (name) {
    findData['name'] = { $regex: name, $options: 'i' }; // 'i' = case-insensitive
  }

  const Projects = await Project.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Projects});
});

//  delete Client
export const deleteProject= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findProject={
    _id: req.params.projectId
  }
  const c = await Project.updateOne(findProject,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Project and all the related data deleted successfully' });
});



export const updateProject = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findProject={
    _id: req.params.projectId
  }
  const updatedProject = await Project.updateOne(findProject,updateData)
  let message = 'Project edited successfully'

  res.status(200).json({ success: true, message: message })
});

