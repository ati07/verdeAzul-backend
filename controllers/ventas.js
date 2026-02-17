// import { mail } from '../helper/mail.js';
import { ventasMail } from "../helper/ventasMail.js";
import Client from "../models/client.js";
import Ventas from "../models/ventas.js";
import computeIsComplete from "./utils/checkComplete.js";
import tryCatch from "./utils/tryCatch.js";
import fs from "fs";
import dotenv from "dotenv";
import { mail } from "../helper/mail.js";
import { createVentasEmail } from "../helper/templates/ventasTemplate.js";
import Inventory from "../models/inventory.js";

dotenv.config();

const REQUIRED_FIELDS = [
  "projectId",
  "clientId",
  "unitName",
  "fechaDeVenta",
  "precioVenta",
  "intereses",
  "contractFilepath",
  "identificationFilepath",
];

// create Client
export const createVentas = tryCatch(async (req, res) => {
  //Todo:  error handling

  let VentasPayload = req.body;
  VentasPayload.addedBy = req.auth.user._id;

  // check that exitence of client, project and unitname
  const existingVentas = await Ventas.findOne({
    clientId: VentasPayload.clientId,
    projectId: VentasPayload.projectId,
    unitName: VentasPayload.unitName,
    isDelete: false,
  });

  if (existingVentas) {
    return res.status(400).json({
      success: false,
      message: "Ventas already exists for this client, project, and unit name",
    });
  }

  // compute completeness before saving
  VentasPayload.isComplete = computeIsComplete(VentasPayload, REQUIRED_FIELDS);
  // VentasPayload.estadoDelCobro = 'No Recibo';
  VentasPayload.isEmailed = true;
  VentasPayload.precioTotalVenta =
    parseFloat(VentasPayload.precioVenta || 0) +
    parseFloat(VentasPayload.intereses || 0);
    
  const observacionesList = [];
  
  if (!VentasPayload.precioVenta || VentasPayload.precioVenta === "") {
    observacionesList.push("Falta: Precio de Venta.");
  }

  if (!VentasPayload.intereses || VentasPayload.intereses === "") {
    observacionesList.push("Falta: Intereses.");
  }

  if (
    VentasPayload.identificationFilepath === "" ||
    !VentasPayload.identificationFilepath
  ) {
    observacionesList.push("Falta: Archivo de Identificación.");
  }

  if (
    VentasPayload.contractFilepath === "" ||
    !VentasPayload.contractFilepath
  ) {
    observacionesList.push("Falta: Archivo de Contrato.");
  }

  if (VentasPayload.isComplete) {
    VentasPayload.observaciones = "Archivo Completo.";
  } else {
    VentasPayload.observaciones = observacionesList.join("\n");
  }
  
  const newVentas = new Ventas(VentasPayload);

  const savedVentas = await newVentas.save();

  console.log("VentasPayload",VentasPayload)
  // update inventory status
  let findInventory = {
    projectId: VentasPayload.projectId,
    unitName: VentasPayload.unitName,
  };

  let updateData = {
    $set: {
      statusId: VentasPayload.statusId,
    },
  };
  const updatedInventory = await Inventory.updateOne(findInventory, updateData);

  // Populate clientId and projectId details
  const populatedVentas = await Ventas.findById(savedVentas._id).populate([
    { path: "clientId", model: "clients" },
    { path: "projectId", model: "projects" },
  ]);

  populatedVentas.to = process.env.FIRST_PERSON_EMAIL;
  populatedVentas.subject = `Nueva Venta Registrada: ${populatedVentas.unitName} - ${populatedVentas.clientId.name}`;
  populatedVentas.html = createVentasEmail(populatedVentas);

  await mail(populatedVentas);
  // await mail(populatedVentas);
  res.status(200).json({
    success: true,
    message: "Ventas added successfully",
    data: populatedVentas,
  });
});

// create getClient
export const getVentas = tryCatch(async (req, res) => {
  let findData = {
    isDelete: false,
  };

  if (req.query.projectId) {
    findData["projectId"] = req.query.projectId;
  }

  if (req.query.clientId) {
    findData["clientId"] = req.query.clientId;
  }

  // Date range filtering
  if (req.query.startDate || req.query.endDate) {
    findData["fechaDeVenta"] = {};

    if (req.query.startDate) {
      findData["fechaDeVenta"]["$gte"] = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      // Set end date to end of day
      const endDate = new Date(req.query.endDate);
      endDate.setHours(23, 59, 59, 999);
      findData["fechaDeVenta"]["$lte"] = endDate;
    }
  }
  // Single date filtering (backward compatibility)
  else if (req.query.fechadeVentas || req.query.fechadeVenats) {
    const singleDate = new Date(
      req.query.fechadeVentas || req.query.fechadeVenats,
    );
    findData["fechaDeVenta"] = {
      $gte: singleDate,
      $lt: new Date(singleDate.getTime() + 24 * 60 * 60 * 1000), // Next day
    };
  }

  const Ventasdata = await Ventas.find(findData)
    .populate([
      { path: "addedBy", model: "users" },
      { path: "projectId", model: "projects" },
      { path: "clientId", model: "clients" },
      { path: 'statusId', model: 'status' },
    ])
    .sort({ _id: -1 });

  res.status(200).json({ success: true, result: Ventasdata });
});

//  delete Client
export const deleteVentas = tryCatch(async (req, res) => {
  let updateData = {
    $set: { isDelete: true },
  };
  let findVentas = {
    _id: req.params.ventasId,
  };
  const directoryPath = "./files/";
  const Ventasdata = await Ventas.find(findVentas).lean();

  if (
    Ventasdata[0].contractFilepath?.split("/files/")?.[1] &&
    Ventasdata[0].contractFilepath?.split("/files/")?.[1] !== ""
  ) {
    fs.unlink(
      directoryPath + Ventasdata[0].contractFilepath.split("/files/")[1],
      (err) => {
        if (err) {
          console.log("Could not delete file: " + err);
          return res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        }
      },
    );
  }

  if( Ventasdata[0].identificationFilepath?.split("/files/")?.[1] && Ventasdata[0].identificationFilepath?.split("/files/")?.[1] !== ""){
      fs.unlink(
    directoryPath + Ventasdata[0].identificationFilepath.split("/files/")[1],
    (err) => {
      if (err) {
        console.log("Could not delete file: " + err);
        return res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }
    },
  );
  }


  const c = await Ventas.updateOne(findVentas, updateData);
  //   let findData={
  //     clientId: req.params.clientId
  //   }

  //   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({
    success: true,
    message: "Ventas and all the related data deleted successfully",
  });
});

export const updateVentas = tryCatch(async (req, res) => {
  // fetch existing document to compute final completeness
  const existing = (await Ventas.findById(req.params.VentasId).lean()) || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged, REQUIRED_FIELDS);

  let VentasPayload = req.body;

  VentasPayload.precioTotalVenta =
    parseFloat(VentasPayload.precioVenta || 0) +
    parseFloat(VentasPayload.intereses || 0);

  const observacionesList = [];
  
  if (!VentasPayload.precioVenta || VentasPayload.precioVenta === "") {
    observacionesList.push("Falta: Precio de Venta.");
  }

  if (!VentasPayload.intereses || VentasPayload.intereses === "") {
    observacionesList.push("Falta: Intereses.");
  }

  if (
    VentasPayload.identificationFilepath === "" ||
    !VentasPayload.identificationFilepath
  ) {
    observacionesList.push("Falta: Archivo de Identificación.");
  }

  if (
    VentasPayload.contractFilepath === "" ||
    !VentasPayload.contractFilepath
  ) {
    observacionesList.push("Falta: Archivo de Contrato.");
  }

  if (merged.isComplete) {
    VentasPayload.observaciones = "Archivo Completo.";
  } else {
    VentasPayload.observaciones = observacionesList.join("\n");
  }

  let updateData = {
    $set: { ...VentasPayload, isComplete: merged.isComplete },
  };

  // let updateData = {
  //   $set: req.body
  // }
  let findVentas = {
    _id: req.params.ventasId,
  };
  const updatedVentas = await Ventas.updateOne(findVentas, updateData);

  // update the inventory status if projectId, unitName or statusId is updated
  let findInventory = {
    projectId: VentasPayload.projectId,
    unitName: VentasPayload.unitName,
  };

  let updateInventory = {
    $set: {
      statusId: VentasPayload.statusId,
    },
  };
  const updatedInventory = await Inventory.updateOne(findInventory, updateInventory);

  let message = "Ventas edited successfully";

  res.status(200).json({ success: true, message: message });
});
