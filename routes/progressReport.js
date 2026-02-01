import express from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} from "../controllers/progressReport.js";
import auth from "../middleware/auth.js";

const funtionRouter = express.Router();

funtionRouter.post("/create", createTask);
funtionRouter.get("/", getTasks);
funtionRouter.delete("/:taskId", deleteTask);
funtionRouter.put("/:taskId", updateTask);

export default funtionRouter;
