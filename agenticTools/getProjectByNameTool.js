import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import Project from "../models/project.js";

export const getProjectByNameTool = new DynamicStructuredTool({
  name: "get_project_by_name",
  description: "Find a project by name and return its MongoDB ID",
  schema: z.object({
    name: z.string()
  }),
  func: async ({ name }) => {
    const project = await Project.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      isDelete: false,
      isActive: true
    }).lean();

    if (!project) {
      throw new Error(`Project '${name}' not found`);
    }

    return {
      projectId: project._id.toString(),
      projectName: project.name
    };
  }
});
