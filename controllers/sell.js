import Sell from '../models/sell.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createSell= tryCatch(async (req, res) => {

  //Todo:  error handling

  let SellPayload = req.body
  SellPayload.addedBy = req.auth.user._id
  
  const newSell= new Sell(SellPayload);

  await newSell.save()
  res.status(200).json({ success: true, message: 'Sell added successfully' });

})

// create getClient
export const getSell= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.inventoryId) {
    findData['inventoryId'] = req.query.inventoryId
  }

  // if (req.query.projectId) {
  //   findData['statusId'] = req.query.statusId
  // }

  const Sells = await Sell.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    // { path: 'clientId', model: 'clients' }
]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Sells});
});

//  delete Client
export const deleteSell= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findSell={
    _id: req.params.sellId
  }
  const c = await Sell.updateOne(findSell,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Sell and all the related data deleted successfully' });
});



export const updateSell= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findSell={
    _id: req.params.sellId
  }
  const updatedSell = await Sell.updateOne(findSell,updateData)
  let message = 'Sell edited successfully'

  res.status(200).json({ success: true, message: message })
});

