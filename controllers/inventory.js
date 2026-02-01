import Inventory from '../models/inventory.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';


const REQUIRED_FIELDS = [
      "clientId",
      "projectId",
      "statusId",
      "userId",
      "typeId",
      "code",
      "unitName",
      "met2",
      "unitArea",
      "priceUnit",
      "priceList",
      "rooms",
      "view",
      "comment",
];


// create Client
export const createInventory= tryCatch(async (req, res) => {

  //Todo:  error handling

  let InventoryPayload = req.body
  InventoryPayload.addedBy = req.auth.user._id
  

  // compute completeness before saving
  InventoryPayload.isComplete = computeIsComplete(InventoryPayload,REQUIRED_FIELDS);
  

  const newInventory= new Inventory(InventoryPayload);

  await newInventory.save()
  res.status(200).json({ success: true, message: 'Inventory added successfully' });

})

// create getClient
export const getInventory= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  if (req.query.statusId) {
    findData['statusId'] = req.query.statusId
  }


  // Pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const pageSize = parseInt(req.query.pageSize) || 50; // Default to 10 items per page
  const skip = (page - 1) * pageSize;

  // Fetch total count of documents
  const totalCount = await Inventory.countDocuments(findData);

  const Inventorys = await Inventory.find(findData).populate([
    // { path: 'addedBy', model: 'users' },
    { path: 'clientId', model: 'clients' },
    { path: 'projectId', model: 'projects' },
    { path: 'statusId', model: 'status' },
    { path: 'userId', model: 'users' },
    { path: 'typeId', model: 'types' }])
    .sort({ _id: -1 })
    .skip(skip)
    .limit(pageSize);

  res.status(200).json({ 
    success: true, 
    result: Inventorys,
    totalCount, // Total number of documents
    currentPage: page, // Current page
    totalPages: Math.ceil(totalCount / pageSize), // Total pages
  });
});

//  delete Client
export const deleteInventory= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findInventory={
    _id: req.params.inventoryId
  }
  const c = await Inventory.updateOne(findInventory,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Inventory and all the related data deleted successfully' });
});



export const updateInventory = tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await Inventory.findById(req.params.inventoryId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }

  // let updateData = {
  //   $set: req.body
  // }
  let findInventory={
    _id: req.params.inventoryId
  }
  const updatedInventory = await Inventory.updateOne(findInventory,updateData)
  let message = 'Inventory edited successfully'

  res.status(200).json({ success: true, message: message })
});

