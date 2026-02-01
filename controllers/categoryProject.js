import CategoryProject from '../models/categoryProject.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createCategoryProject= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CategoryProjectPayload = req.body
  CategoryProjectPayload.addedBy = req.auth.user._id
  

  const newCategoryProject= new CategoryProject(CategoryProjectPayload);

  await newCategoryProject.save()
  res.status(200).json({ success: true, message: 'CategoryProject added successfully' });

})

// create getClient
export const getCategoryProject= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.clientId) {
    findData['clientId'] = req.query.clientId
  }

  const CategoryProjects = await CategoryProject.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    
  ]).sort({ name: 1 });

  res.status(200).json({ success: true, result: CategoryProjects});
});

//  delete Client
export const deleteCategoryProject= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCategoryProject={
    _id: req.params.categoryProjectId
  }
  const c = await CategoryProject.updateOne(findCategoryProject,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'CategoryProject and all the related data deleted successfully' });
});



export const updateCategoryProject = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findCategoryProject={
    _id: req.params.categoryProjectId
  }
  const updatedCategoryProject = await CategoryProject.updateOne(findCategoryProject,updateData)
  let message = 'CategoryProject edited successfully'

  res.status(200).json({ success: true, message: message })
});

