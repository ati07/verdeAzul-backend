import cron from 'node-cron';
import CollectionReport from '../models/collectionReport.js';
import { mail } from '../helper/mail.js';

const MAX_REMINDERS = 3;

cron.schedule('0 0 * * *', async () => {
  try {
    // runs once every 24 hours at midnight
    const pendingReports = await CollectionReport.find({
      isDelete: false,
      isEmailed: false,
      emailReminderCount: { $lt: MAX_REMINDERS }
    });

    for (const report of pendingReports) {
      // optional safety: ensure 24h gap
      if (
        report.lastEmailReminderAt &&
        Date.now() - new Date(report.lastEmailReminderAt).getTime() < 24 * 60 * 60 * 1000
      ) {
        continue;
      }

      const mailPayload = {
        ...report.toObject(),
        subject: `Reminder: Cobro ${report.cobroNumber} pendiente`
      };

      await mail(mailPayload);

      await CollectionReport.updateOne(
        { _id: report._id },
        {
          $inc: { emailReminderCount: 1 },
          $set: { lastEmailReminderAt: new Date() }
        }
      );
    }
  } catch (err) {
    console.error('Collection reminder cron failed:', err);
  }
});
// Export cron job starter
// export { cron as collectionEmailReminderCron };