import Bank from '../models/bank.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createBank= tryCatch(async (req, res) => {

  //Todo:  error handling

  let BankPayload = req.body
  BankPayload.addedBy = req.auth.user._id


  const newBank= new Bank(BankPayload);

  await newBank.save()
  res.status(200).json({ success: true, message: 'Bank added successfully' });

})

// create getClient
export const getBank= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Banks = await Bank.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Banks});
});

//  delete Client
export const deleteBank= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findBank={
    _id: req.params.bankId
  }
  const c = await Bank.updateOne(findBank,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Bank and all the related data deleted successfully' });
});



export const updateBank = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findBank={
    _id: req.params.bankId
  }
  const updatedBank = await Bank.updateOne(findBank,updateData)
  let message = 'Bank edited successfully'

  res.status(200).json({ success: true, message: message })
});

