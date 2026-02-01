import express from "express";
import {
  getProfitability,
  createProfitability,
  updateProfitability,
  deleteProfitability,
} from "../controllers/profitability.js";

const profitabilityRouter = express.Router();

profitabilityRouter.get("/", getProfitability);
profitabilityRouter.post("/", createProfitability);   // bulk insert
profitabilityRouter.put("/:id", updateProfitability);
profitabilityRouter.delete("/:id", deleteProfitability);

export default profitabilityRouter;
