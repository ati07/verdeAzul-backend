export function createModernCollectionEmail(data) {
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
      day: 'numeric' 
    });
  };

  // let logoBase64 = getLogoBase64('./files/VerdeAzulProperties.png');
  let logoUrl = process.env.BACKEND_URL + '/files/images/VerdeAzulProperties.png';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Cobro - ${data.cobroNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #dff1e7 0%, #764ba2 100%); min-height: 100vh;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" style="max-width: 650px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: white; padding: 50px 40px; text-align: center;">
              
              <!-- Logo -->
              <div style="margin-bottom: 30px;">
                <img src=${logoUrl} alt="VerdeAzul Properties" style="max-width: 280px; height: auto; filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));">
              </div>
              
              <div style="background: #0e01014d; backdrop-filter: blur(10px); border-radius: 15px; padding: 30px; margin-bottom: 20px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                  💰 Nuevo Cobro Creado
                </h1>
                <p style="margin: 15px 0 0 0; color: #e0e7ff; font-size: 16px; font-weight: 500;">
                  ${data.cobroNumber}
                </p>
              </div>
              
              <!-- Status Badge -->

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              
              <!-- Summary Cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 35px;">
                <tr>
                  <td width="48%" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 25px; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; color: #0369a1; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Total de Cobro
                    </p>
                    <p style="margin: 0; color: #0c4a6e; font-size: 28px; font-weight: 700;">
                      ${formatCurrency(data.totalCollection)}
                    </p>
                  </td>
                  <td width="4%"></td>
                  
                </tr>
              </table>

              <!-- Details Section -->
              <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 25px 0; color: #1e293b; font-size: 20px; font-weight: 700; border-bottom: 3px solid #667eea; padding-bottom: 12px;">
                  📋 Detalles del Cobro
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Unidad:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.unitName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Tipo de Pago:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.typeOfPayment}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Pago:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDate(data.paymentDate)}</span>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Reporte:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDate(data.reportDate)}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Observation Section -->
              ${data.observation ? `
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #92400e; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  📝 Observación
                </p>
                <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                  ${data.observation}
                </p>
              </div>
              ` : ''}

              <!-- Contract Attachment -->
              ${data.contractFilepath ? `
              <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
                <p style="margin: 0 0 15px 0; color: #1e3a8a; font-size: 14px; font-weight: 600;">
                  📎 Documento Adjunto
                </p>
                <div style="background: #ffffff; border-radius: 8px; padding: 15px; display: inline-block;">
                  <p style="margin: 0; color: #3b82f6; font-size: 13px; font-weight: 500;">
                    ${data.contractFilepath.split('/').pop()}
                  </p>
                </div>
              </div>
              ` : ''}

              <!-- Action Button -->
              <div style="text-align: center; margin-top: 35px;">
                <a href="https://www.appverdeazul.com/entradas" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 45px; border-radius: 30px; font-size: 16px; font-weight: 600; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                  Ver Detalles Completos →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(to right, #f8fafc, #f1f5f9); padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                Este mensaje fue generado automáticamente desde<br>
                <strong style="color: #475569;">VerdeAzul AI System</strong>
              </p>
              <p style="margin: 15px 0 0 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} VerdeAzul. Todos los derechos reservados.
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