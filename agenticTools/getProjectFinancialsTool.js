import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import mongoose from "mongoose";

import CollectionReport from "../models/collectionReport.js";
import PaymentReport from "../models/paymentReport.js";

function parseAmount(value) {
  if (!value) return 0;
  return Number(String(value).replace(/,/g, "").trim()) || 0;
}

export const getProjectFinancialsTool = new DynamicStructuredTool({
  name: "get_project_financials",
  description: "Return total collections, total payments, and net balance for a project",
  schema: z.object({
    projectId: z.string(),
    fromDate: z.string().optional(),
    toDate: z.string().optional()
  }),
  func: async ({ projectId, fromDate, toDate }) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid projectId");
    }

    const pid = new mongoose.Types.ObjectId(projectId);

    const dateFilter = {};
    if (fromDate) dateFilter.$gte = new Date(fromDate);
    if (toDate) dateFilter.$lte = new Date(toDate);

    const [collections, payments] = await Promise.all([
      CollectionReport.find({
        projectId: pid,
        isDelete: false,
        isActive: true,
        ...(Object.keys(dateFilter).length && {
          collectionReportDate: dateFilter
        })
      }).lean(),

      PaymentReport.find({
        projectId: pid,
        isDelete: false,
        isActive: true,
        ...(Object.keys(dateFilter).length && {
          date: dateFilter
        })
      }).lean()
    ]);

    const totalCollection = collections.reduce(
      (sum, r) => sum + parseAmount(r.totalCollection),
      0
    );

    const totalPayments = payments.reduce(
      (sum, r) => sum + parseAmount(r.total),
      0
    );

    return {
      totals: {
        collections: totalCollection,
        payments: totalPayments,
        netBalance: totalCollection - totalPayments
      },
      counts: {
        collectionRecords: collections.length,
        paymentRecords: payments.length
      }
    };
  }
});
