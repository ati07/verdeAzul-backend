import CategoryInTheFlow from '../models/categoryInTheFlow.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createCategoryInTheFlow = tryCatch(async (req, res) => {

  //Todo:  error handling

  let CategoryInTheFlowPayload = req.body
  CategoryInTheFlowPayload.addedBy = req.auth.user._id
  

  const newCategoryInTheFlow= new CategoryInTheFlow(CategoryInTheFlowPayload);

  await newCategoryInTheFlow.save()
  res.status(200).json({ success: true, message: 'CategoryInTheFlow added successfully' });

})

// create getClient
export const getCategoryInTheFlow= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const CategoryInTheFlows = await CategoryInTheFlow.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: CategoryInTheFlows});
});

//  delete Client
export const deleteCategoryInTheFlow= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCategoryInTheFlow={
    _id: req.params.categoryInTheFlowId
  }
  const c = await CategoryInTheFlow.updateOne(findCategoryInTheFlow,updateData);

  res.status(200).json({ success: true, message: 'CategoryInTheFlow and all the related data deleted successfully' });
});



export const updateCategoryInTheFlow = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findCategoryInTheFlow={
    _id: req.params.categoryInTheFlowId
  }
  const updatedCategoryInTheFlow = await CategoryInTheFlow.updateOne(findCategoryInTheFlow,updateData)
  let message = 'CategoryInTheFlow edited successfully'

  res.status(200).json({ success: true, message: message })
});

