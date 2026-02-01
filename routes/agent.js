// import express from "express";
// import { agent } from "../agent/agent.js";

// const agentRoutes = express.Router();

// agentRoutes.post("/financials", async (req, res) => {
//   try {
//     const { input } = req.body;

//     if (!input) {
//       return res.status(400).json({ error: "input is required" });
//     }

//     const result = await agent.invoke(input);

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default agentRoutes;
