import cron from 'node-cron';
import { mail } from '../helper/mail.js';
import { createCEOEmail, formatCurrency } from '../helper/templates/ceoTemplate.js';
import CollectionReport from '../models/collectionReport.js';
import Ventas from '../models/ventas.js';


// Run every day at 8 AM Panama Time (UTC-5)
// For testing: run every minute with '* * * * *'
// const cronSchedule = process.env.NODE_ENV === 'development' ? '* * * * *' : '0 8 * * *';
const cronSchedule = '0 8 * * *';

cron.schedule(cronSchedule, async () => {
  try {
    console.log('Starting CEO Balance Reminder Cron Job...');

    // Get all collection reports
    const collectionFilter = { isDelete: false };
    const CollectionReports = await CollectionReport.find(collectionFilter)
      .populate([
        { path: 'projectId', model: 'projects' },
        { path: 'bankId', model: 'banks' },
        { path: 'clientId', model: 'clients' },
        { path: 'userId', model: 'users' },
      ])
      .lean();

    // Get all ventas
    const ventasFilter = { isDelete: false };
    const ventasData = await Ventas.find(ventasFilter)
      .populate([
        { path: 'projectId', model: 'projects' },
        { path: 'clientId', model: 'clients' },
        { path: 'userId', model: 'users' },
      ])
      .lean();

    // Group collections by clientId, projectId, unitName
    const collectionMap = {};
    CollectionReports.forEach((report) => {
      const key = `${report?.clientId._id}_${report?.projectId._id}_${report.unitName}`;
      if (!collectionMap[key]) {
        collectionMap[key] = {
          id: report._id,
          clientId: report.clientId,
          projectId: report.projectId,
          unitName: report.unitName,
          totalRecibido: 0,
          totalIntereses: 0,
          collectionCount: 0,
          collections: [],
        };
      }
      const recibido = parseFloat(report.recibido) || 0;
      const intereses = parseFloat(report.intereses) || 0;
      collectionMap[key].totalRecibido += recibido;
      collectionMap[key].totalIntereses += intereses;
      collectionMap[key].collectionCount += 1;
      collectionMap[key].collections.push(report);
    });

    // Map ventas by clientId, projectId, unitName (unique combinations)
    const ventasMap = {};
    ventasData.forEach((venta) => {
      const key = `${venta.clientId._id}_${venta.projectId._id}_${venta.unitName}`;
      ventasMap[key] = {
        id: venta?._id,
        clientId: venta?.clientId,
        projectId: venta?.projectId,
        unitName: venta?.unitName,
        precioVenta: venta?.precioVenta,
        intereses: venta?.intereses,
        totalVentas: parseFloat(venta.precioTotalVenta) || 0,
        ventasCount: 1,
      };
    });

    // Calculate balance for each group
    const result = [];

    // Process all groups from collections
    Object.entries(collectionMap).forEach(([key, collectionData]) => {
      const ventasData = ventasMap[key];
      if (ventasData) {
        const totalCapital = collectionData.totalRecibido - collectionData.totalIntereses;
        const balance = ventasData.totalVentas - totalCapital - collectionData.totalIntereses;

        const saldoCapital = ventasData.precioVenta - totalCapital;
        const saldoIntereses = ventasData.intereses - collectionData.totalIntereses;

        result.push({
          id: collectionData.id,
          clientId: collectionData.clientId,
          projectId: collectionData.projectId,
          unitName: collectionData.unitName,
          precioVenta: ventasData.precioVenta,
          intereses: ventasData.intereses,
          precioTotalVenta: ventasData.totalVentas,
          totalRecibido: collectionData.totalRecibido,
          totalCapital: totalCapital,
          totalIntereses: collectionData.totalIntereses,
          balance: balance,
          ventasCount: ventasData.ventasCount,
          collectionCount: collectionData.collectionCount,
          saldoCapital,
          saldoIntereses,
        });
      }
    });

    // Add ventas that have no collections
    Object.entries(ventasMap).forEach(([key, ventasData]) => {
      if (!collectionMap[key]) {
        result.push({
          id: ventasData.id,
          clientId: ventasData.clientId,
          projectId: ventasData.projectId,
          unitName: ventasData.unitName,
          precioVenta: ventasData.precioVenta,
          intereses: ventasData.intereses,
          precioTotalVenta: ventasData.totalVentas,
          totalRecibido: 0,
          totalCapital: 0,
          totalIntereses: 0,
          balance: ventasData.totalVentas,
          ventasCount: ventasData.ventasCount,
          collectionCount: 0,
          saldoCapital: 0,
          saldoIntereses: 0,
        });
      }
    });

    // Calculate total balance
    const totalBalance = result.reduce((sum, item) => sum + (Number(item?.balance) || 0), 0);

    console.log(`Total Balance: ${formatCurrency(totalBalance)}`);
    console.log(`Total Ventas: ${result.length}`);

    // Generate email HTML
    const emailHtml = createCEOEmail(
      { totalBalance }
    );

    // Send email
    // Balance Total: ${formatCurrency(totalBalance)} 
    const ceoEmail = process.env.CEO_EMAIL || 'ceo@appverdeazul.com'; // Set this in .env
    // const ceoEmail = "atiurrahman.ansari@gmail.com, jean@e-onlinefactor.com"
    await mail({
      to: ceoEmail,
      subject: `Reporte Diario de Cartera - ${new Date().toLocaleDateString('es-PA')}`,
      html: emailHtml,
      text: `Balance Total: ${formatCurrency(totalBalance)}`,
    });

    console.log(`✓ CEO Balance Reminder email sent successfully to ${ceoEmail}`);
  } catch (error) {
    console.error('❌ Error in CEO Reminder Cron Job:', error);
  }
}, {
  timezone: 'America/Panama', // Panama Time Zone
});