export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "PAB",
  }).format(amount || 0);
};

export function createCobroRecibidoEmail(
  cobroData,
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
  let logoUrl = process.env.BACKEND_URL + "/files/VerdeAzulProperties.png";

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cobro Recibido - ${cobroData.cobroNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #dff1e7 0%, #0284c7 100%); min-height: 100vh;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" style="max-width: 700px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: gray; padding: 50px 40px; text-align: center; position: relative;">
              
              <!-- Success Animation Background -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 20px 20px;"></div>
              
              <!-- Logo -->
              <div style="margin-bottom: 25px; position: relative; z-index: 1;">
                <img src=${logoUrl} alt="VerdeAzul Properties" style="max-width: 260px; height: auto; filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));">
              </div>
              
              <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 15px; padding: 30px; position: relative; z-index: 1;">
                <h1 style="margin: 0; color: #ffffff; font-size: 34px; font-weight: 800; letter-spacing: -0.5px;">
                  ¡Cobro Recibido!
                </h1>
                <p style="margin: 15px 0 0 0; color: #e0f2fe; font-size: 18px; font-weight: 600;">
                  Cobro #${cobroData.cobroNumber}
                </p>
              </div>
              
              <!-- Status Badge -->
              <div style="display: inline-block; background: #10b981; color: #ffffff; padding: 12px 30px; border-radius: 30px; font-size: 15px; font-weight: 700; margin-top: 20px; box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4); position: relative; z-index: 1;">
                ✓ ${cobroData.estadoDelCobro}
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              
              <!-- Amount Summary Cards -->
              <table width="100%" cellpadding="0" cellspacing="0">
              <!-- Row 1: Total Recibido (centered) -->
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                                    border-radius: 16px;
                                    padding: 30px 40px;
                                    text-align: center;
                                    border: 3px solid #10b981;
                                    box-shadow: 0 8px 25px rgba(16,185,129,0.2);">
                          <p style="margin: 0 0 10px 0;
                                    color: #065f46;
                                    font-size: 14px;
                                    font-weight: 700;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;">
                            💰 Total Recibido
                          </p>
                          <p style="margin: 0;
                                    color: #064e3b;
                                    font-size: 46px;
                                    font-weight: 900;
                                    line-height: 1;">
                            ${formatCurrency(cobroData.recibido)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Row 2: Equal boxes -->
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <!-- Pago Capital -->
                      <td width="33.33%" align="center" style="padding: 0 6px;">
                        <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                                    border-radius: 12px;
                                    padding: 22px;
                                    text-align: center;">
                          <p style="margin: 0 0 8px 0;
                                    color: #1e40af;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;">
                            Pago Capital
                          </p>
                          <p style="margin: 0;
                                    color: #1e3a8a;
                                    font-size: 26px;
                                    font-weight: 800;">
                            ${formatCurrency(cobroData.pagoCapital)}
                          </p>
                        </div>
                      </td>

                      <!-- Intereses -->
                      <td width="33.33%" align="center" style="padding: 0 6px;">
                        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                                    border-radius: 12px;
                                    padding: 22px;
                                    text-align: center;">
                          <p style="margin: 0 0 8px 0;
                                    color: #92400e;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;">
                            Intereses
                          </p>
                          <p style="margin: 0;
                                    color: #78350f;
                                    font-size: 26px;
                                    font-weight: 800;">
                            ${formatCurrency(cobroData.intereses)}
                          </p>
                        </div>
                      </td>

                      <!-- Gastos -->
                      <td width="33.33%" align="center" style="padding: 0 6px;">
                        <div style="background: #ff000080;
                                    border-radius: 12px;
                                    padding: 22px;
                                    text-align: center;">
                          <p style="margin: 0 0 8px 0;
                                    color: #7f1d1d;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;">
                            Gastos
                          </p>
                          <p style="margin: 0;
                                    color: #7f1d1d;
                                    font-size: 26px;
                                    font-weight: 800;">
                            ${formatCurrency(cobroData.gastos)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

              <!-- Client & Unit Information -->
              ${
                clientData.name
                  ? `
              <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px; border-left: 5px solid #0ea5e9;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                  <span style="background: #e0f2fe; color: #0c4a6e; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 20px;">
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
                      <span style="color: #1e293b; font-size: 15px; font-weight: 700;">${clientData.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Unidad:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #0ea5e9; font-size: 16px; font-weight: 800;">${cobroData.unitName}</span>
                    </td>
                  </tr>
                  ${
                    projectData.name
                      ? `
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Proyecto:</span>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${projectData.name}</span>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>
              `
                  : ""
              }

              <!-- Payment Details -->
              <div style="background: #f8fafc; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 25px 0; color: #1e293b; font-size: 20px; font-weight: 700; border-bottom: 3px solid #0ea5e9; padding-bottom: 12px; display: flex; align-items: center;">
                  
                  Detalles del Cobro
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Número de Cobro:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #0ea5e9; font-size: 16px; font-weight: 800;">#${cobroData.cobroNumber}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Tipo de Pago:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="display: inline-block; background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 15px; font-size: 13px; font-weight: 700;">
                        ${cobroData.typeOfPayment}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Entrada:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDateTime(cobroData.fechaEntrada)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Reporte:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDate(cobroData.reportDate)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Fecha de Reporte de Cobro:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatDate(cobroData.collectionReportDate)}</span>
                    </td>
                  </tr>
                  ${
                    userData.name
                      ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Procesado por:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                      <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${userData.name}</span>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #64748b; font-size: 14px; font-weight: 500;">Estado:</span>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <span style="display: inline-block; padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: 800; background: #d1fae5; color: #065f46;">
                        ✓ ${cobroData.estadoDelCobro}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Observation -->
              ${
                cobroData.observation
                  ? `
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #92400e; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  📝 Observación
                </p>
                <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                  ${cobroData.observation}
                </p>
              </div>
              `
                  : ""
              }

              <!-- Summary Box -->
              <div style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border-radius: 15px; padding: 30px; margin-bottom: 35px; border: 2px solid #0ea5e9;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #0c4a6e; font-size: 14px; font-weight: 600;">Pago Capital:</span>
                    </td>
                    <td style="text-align: right; padding: 8px 0;">
                      <span style="color: #0c4a6e; font-size: 16px; font-weight: 700;">${formatCurrency(cobroData.pagoCapital)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #0c4a6e; font-size: 14px; font-weight: 600;">Intereses:</span>
                    </td>
                    <td style="text-align: right; padding: 8px 0;">
                      <span style="color: #0c4a6e; font-size: 16px; font-weight: 700;">${formatCurrency(cobroData.intereses)}</span>
                    </td>
                  </tr>
                  ${
                    cobroData.gastos
                      ? `
                  <tr>
                    <td style="padding: 8px 0; border-top: 1px solid #0ea5e9;">
                      <span style="color: #dc2626; font-size: 14px; font-weight: 600;">Gastos:</span>
                    </td>
                    <td style="text-align: right; padding: 8px 0; border-top: 1px solid #0ea5e9;">
                      <span style="color: #dc2626; font-size: 16px; font-weight: 700;">-${formatCurrency(cobroData.gastos)}</span>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td style="padding: 12px 0; border-top: 2px solid #0ea5e9;">
                      <span style="color: #075985; font-size: 16px; font-weight: 800; text-transform: uppercase;">Total Recibido:</span>
                    </td>
                    <td style="text-align: right; padding: 12px 0; border-top: 2px solid #0ea5e9;">
                      <span style="color: #075985; font-size: 22px; font-weight: 900;">${formatCurrency(cobroData.recibido || cobroData.totalCollection)}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.appverdeazul.com/collections_report" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 30px; font-size: 16px; font-weight: 700; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);">
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
