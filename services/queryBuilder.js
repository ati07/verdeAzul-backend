import mongoose from "mongoose";
import { schemaConfig } from "./schemaConfig.js";

export async function buildAndRunQuery(config) {
  const { collection, filters, groupBy, project } = config;

  const Model = mongoose.model(collection);

  const safeProject =
    project && Object.keys(project).length > 0
      ? project
      : { _id: 0 }; // fallback so Mongo never errors

  if (groupBy) {
    return Model.aggregate([
      { $match: filters || {} },
      { $group: groupBy },
      { $project: safeProject }
    ]);
  }

  return Model.find(filters || {}, safeProject);
}
