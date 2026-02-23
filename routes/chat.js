import express from "express";
import { 
  createChat,
  getChats,
  getChatById,
  addMessage,
  deleteChat
} from "../controllers/chat.js";

import auth from "../middleware/auth.js";
const ChatRouter = express.Router();

ChatRouter.post("/", auth,createChat);
ChatRouter.get("/", auth,getChats);
ChatRouter.get("/:chatId", auth, getChatById);
ChatRouter.put("/:chatId/add-message", auth,addMessage);
ChatRouter.patch("/:chatId", auth,deleteChat);

export default ChatRouter;
