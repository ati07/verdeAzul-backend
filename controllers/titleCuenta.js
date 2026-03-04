import TitleCuenta from '../models/titleCuenta.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createTitleCuenta= tryCatch(async (req, res) => {

  //Todo:  error handling

  let TitleCuentaPayload = req.body
  TitleCuentaPayload.addedBy = req.auth.user._id
  
  const newTitleCuenta= new TitleCuenta(TitleCuentaPayload);

  await newTitleCuenta.save()
  res.status(200).json({ success: true, message: 'Title Cuenta added successfully' });

})

// create getClient
export const getTitleCuenta= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const TitleCuentas = await TitleCuenta.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: TitleCuentas});
});

//  delete Client
export const deleteTitleCuenta= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findTitleCuenta={
    _id: req.params.titleCuentaId
  }
  const c = await TitleCuenta.updateOne(findTitleCuenta,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Title Cuenta and all the related data deleted successfully' });
});



export const updateTitleCuenta = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findTitleCuenta={
    _id: req.params.titleCuentaId
  }
  const updatedTitleCuenta = await TitleCuenta.updateOne(findTitleCuenta,updateData)
  let message = 'Title Cuenta edited successfully'

  res.status(200).json({ success: true, message: message })
});

