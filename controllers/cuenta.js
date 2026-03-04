import Cuenta from '../models/cuenta.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createCuenta= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CuentaPayload = req.body
  CuentaPayload.addedBy = req.auth.user._id
  
  const newCuenta= new Cuenta(CuentaPayload);

  await newCuenta.save()
  res.status(200).json({ success: true, message: 'Cuenta added successfully' });

})

// create getClient
export const getCuenta= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Cuentas = await Cuenta.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Cuentas});
});

//  delete Client
export const deleteCuenta= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCuenta={
    _id: req.params.cuentaId
  }
  const c = await Cuenta.updateOne(findCuenta,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Cuenta and all the related data deleted successfully' });
});



export const updateCuenta = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findCuenta={
    _id: req.params.cuentaId
  }
  const updatedCuenta = await Cuenta.updateOne(findCuenta,updateData)
  let message = 'Cuenta edited successfully'

  res.status(200).json({ success: true, message: message })
});

