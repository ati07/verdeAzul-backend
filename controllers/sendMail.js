import { mail } from '../helper/mail.js';
import { sendMailWithAttachments } from '../helper/fileMailer.js';
import { createAnnaEmailTemplate } from '../helper/templates/annaEmailTemplate.js';
import CollectionReport from '../models/collectionReport.js';
import tryCatch from './utils/tryCatch.js';
import { pdfMail } from '../helper/pdfMailer.js';


let template = {
  "createAnnaEmailTemplate":createAnnaEmailTemplate
}

// Send email
export const sendMail= tryCatch(async (req, res) => {

// console.log("req.body",req.body)
let data = req.body
const payload = {
  to: process.env.ANNA_EMAIL,
  subject: data.subject,
  html: template[data.html]({subject: data.subject,...data.body})
 }

 await mail(payload)
 

 res.status(200).json({ success: true, message: "Email sent successfully" });
});

// Send email with attachment and collectionReportId
export const sendMailWithAttachment = tryCatch(async (req, res) => {

  let findCollectionReport={
    _id: req.params.collectionReportId
  }

  await pdfMail(req.body) 
  let date = new Date().toISOString().split('T')[0]
  // console.log("Date",date)
  let updateData = {
    $set: {
      entryDate: date,
      // estadoDelCobro:"Recibido",
      isEmailedToClient:true
    }

  }
  // console.log("req.params",req.params,  "findCollectionReport",findCollectionReport)
 const updatedCollectionReport = await CollectionReport.updateOne(findCollectionReport,updateData)

  res.status(200).json({ success: true, message: "Email sent successfully" });
})

// Send email with attachment
export const sendMailWithAttachmentWithoutId = tryCatch(async (req, res) => {

  await sendMailWithAttachments(req.body) 

  res.status(200).json({ success: true, message: "Email sent successfully" });
})



