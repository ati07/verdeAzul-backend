import Client from '../models/client.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';


//

const REQUIRED_FIELDS = [
            "description",
            "name",
            "phoneNumber",
            "email"
];


// create Client
export const createClient = tryCatch(async (req, res) => {

  //Todo:  error handling

  let clientPayload = req.body
  
  // if(req.auth.user.role == 'Partner' ){
  //   clientPayload.partnerId = req.auth.user._id
  // }
  clientPayload.addedBy = req.auth.user._id

  clientPayload.isComplete = computeIsComplete(clientPayload, REQUIRED_FIELDS);

  console.log("clientPayload",clientPayload)
  const newClient = new Client(clientPayload);

  await newClient.save()
  res.status(200).json({ success: true, message: 'Client added successfully' });

})

// create getClient
export const getClient = tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if(req.auth.user.role == 'Partner' ){
  //   findData.partnerId = req.auth.user._id
  // }
  const { name } = req.query;
  // Add regex for partial matching if snName is provided
  if (name) {
    findData['name'] = { $regex: name, $options: 'i' }; // 'i' = case-insensitive
  }

  const client = await Client.find(findData)
  .populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 }).lean();

  let clients = client.map((c)=>{
      const observacionesList = [];
      
      if (!c.name || c.name === "") {
        observacionesList.push("Falta: Nombre del cliente.");
      }

      if (!c.email || c.email === "") {
        observacionesList.push("Falta: Email del cliente.");
      }

      if (!c.phoneNumber || c.phoneNumber === "") {
        observacionesList.push("Falta: Número de teléfono del cliente.");
      }

      if (!c.description || c.description === "") {
        observacionesList.push("Falta: Descripción del cliente.");
      }

      if (c.isComplete) {
        c.observaciones = "Archivo Completo.";
      } else {
        c.observaciones = observacionesList.join("\n");
      }
      // console.log("c",c.name,c.email,c.phoneNumber,c.description, c.observaciones)

      return c;

  })
  // clients.map((c)=>console.log("cc",c.name,c.observaciones))
  res.status(200).json({ success: true, result: clients });
});

//  delete Client
export const deleteClient = tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findClient={
    _id: req.params.clientId
  }
  const c = await Client.updateOne(findClient,updateData);
  // let findData={
  //   clientId: req.params.clientId
  // }
  
  res.status(200).json({ success: true, message: 'Client and all the related data deleted successfully' });
});



export const updateClient = tryCatch(async (req, res) => {
  const existing = await Client.findById(req.params.clientId).lean()
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged, REQUIRED_FIELDS);

  let updateData = {
    $set: {...req.body, isComplete: merged.isComplete}
  }
  let findClient={
    _id: req.params.clientId
  }
  const updatedClient = await Client.updateOne(findClient,updateData)
  let message = "Client updated successfully"

  res.status(200).json({ success: true, message: message })
});

