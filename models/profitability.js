import mongoose from "mongoose";

const profitabilitySchema = new mongoose.Schema(
  {
    name: { type: String },

    budget: { type: mongoose.Schema.Types.Mixed, default: "" },
    budgetPercentage: { type: String, default: "" },

    projection: { type: mongoose.Schema.Types.Mixed, default: "" },
    projectionPercentage: { type: String, default: "" },

    variation: { type: mongoose.Schema.Types.Mixed, default: "" },

    advance: { type: mongoose.Schema.Types.Mixed, default: "" },
    advancePercentage: { type: String, default: "" },

    pending: { type: mongoose.Schema.Types.Mixed, default: "" },
    pendingPercentage: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Profitability = mongoose.model("Profitability", profitabilitySchema);
