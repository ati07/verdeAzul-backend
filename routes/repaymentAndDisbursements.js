import express from "express";
import {
  createFinancial,
  getFinancials,
  getFinancialById,
  updateFinancial,
  deleteFinancial,
  getOrCreateByYear,
} from "../controllers/repaymentAndDisbursements.js";

const repaymentAndDisbursementsRouter = express.Router();

// CRUD routes
repaymentAndDisbursementsRouter.post("/", createFinancial);       // Create
repaymentAndDisbursementsRouter.get("/", getFinancials);          // Read all
repaymentAndDisbursementsRouter.get("/:id", getFinancialById);    // Read one
repaymentAndDisbursementsRouter.put("/:id", updateFinancial);     // Update
repaymentAndDisbursementsRouter.delete("/:id", deleteFinancial);  // Delete
repaymentAndDisbursementsRouter.get("/year/:year", getOrCreateByYear);

export default repaymentAndDisbursementsRouter;
