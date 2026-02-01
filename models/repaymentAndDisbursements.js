import mongoose from "mongoose";

const monthlyDataSchema = new mongoose.Schema({
  january: { type: String, default: 0 },
  february: { type: String, default: 0 },
  march: { type: String, default: 0 },
  april: { type: String, default: 0 },
  may: { type: String, default: 0 },
  june: { type: String, default: 0 },
  july: { type: String, default: 0 },
  august: { type: String, default: 0 },
  september: { type: String, default: 0 },
  october: { type: String, default: 0 },
  november: { type: String, default: 0 },
  december: { type: String, default: 0 },
  total: { type: String, default: 0 },
});

const repaymentAndDisbursementsSchema = new mongoose.Schema({
  year: { type: String },

  // Mensuales section
  mensuales: {
    desembolsos: { type: monthlyDataSchema },
    repagos: { type: monthlyDataSchema },
  },

  // Acumulados section
  acumulados: {
    desembolsos: { type: monthlyDataSchema },
    repagos: { type: monthlyDataSchema},
    saldo: { type: monthlyDataSchema },
  },
});

export const RepaymentAndDisbursements = mongoose.model("RepaymentAndDisbursements", repaymentAndDisbursementsSchema);
