import CategoryWorkProgress from '../../models/workProgress/category.js';
// import computeIsComplete from '../utils/checkComplete.js';
import tryCatch from '../utils/tryCatch.js';

// create Client
export const createCategoryWorkProgress= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CategoryWorkProgressPayload = req.body
  CategoryWorkProgressPayload.addedBy = req.auth.user._id
  

  const newCategoryWorkProgress= new CategoryWorkProgress(CategoryWorkProgressPayload);

  await newCategoryWorkProgress.save()
  res.status(200).json({ success: true, message: 'Category of Work Progress added successfully' });

})

// create getClient
export const getCategoryWorkProgress= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if (req.query.clientId) {
  //   findData['clientId'] = req.query.clientId
  // }

  const CategoryWorkProgresss = await CategoryWorkProgress.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    
  ]).sort({ name: 1 });

  res.status(200).json({ success: true, result: CategoryWorkProgresss});
});

//  delete Client
export const deleteCategoryWorkProgress= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCategoryWorkProgress={
    _id: req.params.categoryWorkProgressId
  }
  const c = await CategoryWorkProgress.updateOne(findCategoryWorkProgress,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Category of Work Progress and all the related data deleted successfully' });
});



export const updateCategoryWorkProgress = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findCategoryWorkProgress={
    _id: req.params.categoryWorkProgressId
  }
  const updatedCategoryWorkProgress = await CategoryWorkProgress.updateOne(findCategoryWorkProgress,updateData)
  let message = 'Category of Work Progress edited successfully'

  res.status(200).json({ success: true, message: message })
});

