export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "PAB",
  }).format(amount || 0);
};

export function createAnnaEmailTemplate(
  data,
  clientData = {},
  projectData = {},
  userData = {},
) {
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("es-PA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("es-PA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  let logoUrl = process.env.BACKEND_URL + "/files/images/VerdeAzulProperties.png";

 return `
 <!DOCTYPE html>
 <html lang="es">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
 </head>
 <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #dff1e7 0%, #0284c7 100%); min-height: 100vh;">
   
   <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
     <tr>
       <td align="center">
         
         <!-- Main Container -->
         <table width="100%" style="max-width: 700px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
           
           <!-- Header -->
           <tr>
             <td style="background: white; padding: 50px 40px; text-align: center; position: relative;">
               
               <!-- Success Animation Background -->
               <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 20px 20px;"></div>
               
               <!-- Logo -->
               <div style="margin-bottom: 25px; position: relative; z-index: 1;">
                 <img src=${logoUrl} alt="VerdeAzul Properties" style="max-width: 260px; height: auto; filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));">
               </div>
               
               <div style="background: #0e01014d; backdrop-filter: blur(10px); border-radius: 15px; padding: 30px; position: relative; z-index: 1;">
                 <h1 style="margin: 0; color: #ffffff; font-size: 34px; font-weight: 800; letter-spacing: -0.5px;">
                   ¡Actualizacion de Cobro!
                 </h1>
                 
               </div>
               <div>
                 <p>Este es un mensaje automático del sistema IA de GVA para
 actualizarte sobre el estado de la cartera de cobros de las
 propiedades vendidas.</p>
               </div>
               
             </td>
           </tr>
 
           <!-- Content -->
           <tr>
             <td style="padding: 45px 40px;">
               
               <!-- Amount Summary Cards -->
               <table width="100%" cellpadding="0" cellspacing="0">
               <!-- Row 1: Total Recibido (centered) -->
               <!-- Payment Details -->
               <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                 <h2 style="margin: 0 0 25px 0; color: #1e293b; font-size: 20px; font-weight: 700; border-bottom: 3px solid #0ea5e9; padding-bottom: 12px; display: flex; align-items: center;">
                   
                   Detalles del Reporte
                 </h2>
                 
                 <table width="100%" cellpadding="0" cellspacing="0">
                   
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Cobro Nr.:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="display: inline-block; background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 15px; font-size: 13px; font-weight: 700;">
                        ${data.cobroNumber}
                       </span>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Cliente:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.clientName}</span>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Total Cobro:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="color: #1e293b; font-size: 14px; font-weight: 600;">$${data.totalCollection}</span>
                     </td>
                   </tr>
                   
             
                   
                 </table>
               </div>

               <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                 <h2 style="margin: 0 0 25px 0; color: #1e293b; font-size: 20px; font-weight: 700; border-bottom: 3px solid #0ea5e9; padding-bottom: 12px; display: flex; align-items: center;">
                   
                   Correo de Estatus
                 </h2>
                 
                 <table width="100%" cellpadding="0" cellspacing="0">
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fetcha Estatus:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="display: inline-block; background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 15px; font-size: 13px; font-weight: 700;">
                        ${data?.statusDate ?? formatDate(new Date().toLocaleDateString('es-PA'))}
                       </span>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Estatus:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="display: inline-block; background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 15px; font-size: 13px; font-weight: 700;">
                        ${data?.statusTime ?? formatDate(new Date().toLocaleTimeString('es-PA'))}
                       </span>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                       <span style="color: #64748b; font-size: 14px; font-weight: 500;">Estatus:</span>
                     </td>
                     <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                       <span style="display: inline-block; background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 15px; font-size: 13px; font-weight: 700;">
                        ${data.status}
                       </span>
                     </td>
                   </tr>
                   
                 </table>
               </div>
 
               
 
             </td>
           </tr>
 
           <!-- Footer -->
           <tr>
             <td style="background: linear-gradient(to right, #f8fafc, #f1f5f9); padding: 35px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
               <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                 Este mensaje fue generado automáticamente desde<br>
                 <strong style="color: #0ea5e9;">VerdeAzul AI System</strong>
               </p>
               <p style="margin: 15px 0 0 0; color: #94a3b8; font-size: 12px;">
                 © ${new Date().getFullYear()} VerdeAzul Properties. Todos los derechos reservados.
               </p>
             </td>
           </tr>
 
         </table>
 
       </td>
     </tr>
   </table>
 
 </body>
 </html>
   `;
}
