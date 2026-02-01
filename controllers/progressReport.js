import Task from "../models/progressReport.js";
import tryCatch from "./utils/tryCatch.js";

// Create Task
export const createTask = tryCatch(async (req, res) => {

  // Todo: error handling

  let payload = req.body;
  payload.addedBy = req.auth.user._id;

  const newTask = new Task(payload);

  await newTask.save();

  res.status(200).json({
    success: true,
    message: "Task added successfully"
  });
});

// Get Tasks
export const getTasks = tryCatch(async (req, res) => {
  let findData = {
    isDelete: false
  };

  const tasks = await Task.find(findData)
    .populate([{ path: "addedBy", model: "users" }])
    .sort({ _id: -1 });

  res.status(200).json({
    success: true,
    result: tasks
  });
});

// Soft Delete Task
export const deleteTask = tryCatch(async (req, res) => {
  let findTask = {
    _id: req.params.taskId
  };

  let updateData = {
    $set: { isDelete: true }
  };

  await Task.updateOne(findTask, updateData);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully"
  });
});

// Update Task
export const updateTask = tryCatch(async (req, res) => {
  let findTask = {
    _id: req.params.taskId
  };

  let updateData = {
    $set: req.body
  };

  await Task.updateOne(findTask, updateData);

  res.status(200).json({
    success: true,
    message: "Task updated successfully"
  });
});
