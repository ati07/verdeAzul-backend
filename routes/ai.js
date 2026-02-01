import express from "express";
import { geminiPrompt } from "../services/gemini.js";
import { schemaConfig } from "../services/schemaConfig.js";
import { buildAndRunQuery } from "../services/queryBuilder.js";

const AiRouter = express.Router();

// Helper to safely extract JSON from Gemini output
function extractJson(text) {
  if (!text) throw new Error("Empty response from Gemini");

  // Remove code fences like ```json or ```
  let cleaned = text.replace(/```json|```/gi, "").trim();

  // Find the first { ... } block
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON object found in Gemini output");

  return JSON.parse(jsonMatch[0]); // parse ONLY the JSON object
}

AiRouter.post("/query", async (req, res) => {
  try {
    const { question } = req.body;

    const prompt = `
You convert natural language into MongoDB query instructions.

Return ONLY pure JSON.
No comments. No explanation. No markdown.

SCHEMA:
${JSON.stringify(schemaConfig)}

USER QUESTION:
"${question}"

Respond with exactly:
{
  "collection": "",
  "filters": {},
  "groupBy": null,
  "project": {}
}
    `;

    // ---- CALL GEMINI ----
    const rawResponse = await geminiPrompt(prompt);
    console.log("Gemini raw:", rawResponse);

    // ---- CLEAN + PARSE JSON SAFELY ----
    const queryConfig = extractJson(rawResponse);

    // ---- RUN QUERY ----
    const data = await buildAndRunQuery(queryConfig);

    res.json({
      success: true,
      queryUsed: queryConfig,
      data
    });
  } catch (err) {
    console.error("AI Query Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default AiRouter;
