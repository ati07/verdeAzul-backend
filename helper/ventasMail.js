import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

function createVentasEmail(ventasData) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PA', { 
      style: 'currency', 
      currency: 'PAB' 
    }).format(amount || 0);
  };
  const formatString = (str) => {
      return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-PA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-PA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
let logoUrl = process.env.BACKEND_URL + '/files/VerdeAzulProperties.png';
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Venta Registrada - ${ventasData.unitName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%); min-height: 100vh;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" style="max-width: 700px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 40px; text-align: center;">
              
              <!-- Logo -->
              <div style="margin-bottom: 30px;">
                <img src=${logoUrl} alt="VerdeAzul Properties" style="max-width: 280px; height: auto; filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));">
              </div>
              
              <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); border-radius: 15px; padding: 35px; margin-bottom: 20px;">
                <div style="background: rgba(255, 255, 255, 0.3); display: inline-block; padding: 8px 20px; border-radius: 25px; margin-bottom: 15px;">
                  <span style="color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                    🎉 Nueva Venta
                  </span>
                </div>
                <h1 style="margin: 15px 0 0 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: -0.5px;">
                  ${formatString(ventasData.clientId.name) + "-" + ventasData.unitName || 'Unidad'}
                </h1>
                <p style="margin: 12px 0 0 0; color: #d1fae5; font-size: 16px; font-weight: 500;">
                  ${formatString(ventasData.projectId.name) || 'Proyecto VerdeAzul'}
                </p>
              </div>
              
              <!-- Status Badge -->
             
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              
              <!-- Price Highlight -->
              <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 35px; margin-bottom: 35px; text-align: center; border: 2px solid #10b981;">
                <p style="margin: 0 0 10px 0; color: #065f46; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  💰 Precio Total de Venta
                </p>
                <p style="margin: 0; color: #064e3b; font-size: 48px; font-weight: 800; line-height: 1;">
                  $${formatCurrency(ventasData.precioTotalVenta)}
                </p>
              </div>

              <!-- Client Information -->
              ${ventasData.clientId.name ? `
              <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px; border-left: 5px solid #3b82f6;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: #dbeafe; color: #1e40af; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 20px;">
                    👤
                  </span>
                  Información del Cliente
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Nombre:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 15px; font-weight: 700;">${formatString(ventasData.clientId.name)}</span>
                    </td>
                  </tr>
                  ${ventasData.clientId.email ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Email:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <a href="mailto:${ventasData.clientId.email}" style="color: #3b82f6; font-size: 14px; font-weight: 600; text-decoration: none;">
                        ${ventasData.clientId.email}
                      </a>
                    </td>
                  </tr>
                  ` : ''}
                  ${ventasData.clientId.name ? `
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Cédula:</span>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatString(ventasData.clientId.name)}</span>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              ` : ''}

              <!-- Sale Details -->
              <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 25px 0; color: #1e293b; font-size: 20px; font-weight: 700; border-bottom: 3px solid #10b981; padding-bottom: 12px; display: flex; align-items: center;">
                  <span style="background: #d1fae5; color: #065f46; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 20px;">
                    📋
                  </span>
                  Detalles de la Venta
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Unidad:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 15px; font-weight: 700;">${ventasData.unitName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Venta:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDateShort(ventasData.fechaDeVenta)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Precio Total:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #10b981; font-size: 18px; font-weight: 700;">${formatCurrency(ventasData.precioTotalVenta)}</span>
                    </td>
                  </tr>
                  ${ventasData.projectId.name ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Proyecto:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatString(ventasData.projectId.name)}</span>
                    </td>
                  </tr>
                  ` : ''}
                  
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Registro:</span>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <span style="color: #1e293b; font-size: 13px; font-weight: 600;">${formatDate(ventasData.createdAt)}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Documents Section -->
              ${ventasData.contractFilepath || ventasData.identificationFilepath ? `
              <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 15px; padding: 30px; margin-bottom: 30px; border: 2px dashed #3b82f6;">
                <h2 style="margin: 0 0 20px 0; color: #1e40af; font-size: 18px; font-weight: 700; display: flex; align-items: center;">
                  <span style="font-size: 24px; margin-right: 10px;">📎</span>
                  Documentos Adjuntos
                </h2>
                
                ${ventasData.contractFilepath ? `
                <div style="background: #ffffff; border-radius: 10px; padding: 18px; margin-bottom: ${ventasData.identificationFilepath ? '15px' : '0'}; display: flex; align-items: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                  <div style="background: #dbeafe; color: #1e40af; width: 45px; height: 45px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 22px; flex-shrink: 0;">
                    📄
                  </div>
                  <div style="flex-grow: 1;">
                    <p style="margin: 0 0 4px 0; color: #1e293b; font-size: 14px; font-weight: 700;">
                      Contrato de Venta
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: 500;">
                      ${ventasData.contractFilepath.split('/').pop()}
                    </p>
                  </div>
                </div>
                ` : ''}
                
                ${ventasData.identificationFilepath ? `
                <div style="background: #ffffff; border-radius: 10px; padding: 18px; display: flex; align-items: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                  <div style="background: #dbeafe; color: #1e40af; width: 45px; height: 45px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 22px; flex-shrink: 0;">
                    🪪
                  </div>
                  <div style="flex-grow: 1;">
                    <p style="margin: 0 0 4px 0; color: #1e293b; font-size: 14px; font-weight: 700;">
                      Documento de Identificación
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: 500;">
                      ${ventasData.identificationFilepath.split('/').pop()}
                    </p>
                  </div>
                </div>
                ` : ''}
              </div>
              ` : ''}

              <!-- Action Button -->
              <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.appverdeazul.com/ventas" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 30px; font-size: 16px; font-weight: 700; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4); transition: all 0.3s;">
                  Ver Detalles Completos →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(to right, #f8fafc, #f1f5f9); padding: 35px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                Este mensaje fue generado automáticamente desde<br>
                <strong style="color: #10b981;">VerdeAzul Properties Management System</strong>
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

const auth = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

auth.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth });

function makeEmail({ to, from, subject, html }) {
  const message =
    `From: ${from}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    'X-Priority: 1\r\n' +
    'X-MSMail-Priority: High\r\n' +
    'Importance: High\r\n' +
    `Content-Type: text/html; charset=utf-8\r\n\r\n` +
    html;

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export async function ventasMail(data) {
  const html = createVentasEmail(data);


  const raw = makeEmail({
    from: '"VerdeAzul" <asistente@appverdeazul.com>',
    to: data.to,
    subject: data.subject,
    html,
  });

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  console.log('Ventas email sent via Gmail API:', res.data.id);
  return res.data;
}
