import Chat from '../models/chat.js';
import tryCatch from './utils/tryCatch.js';

// Create Chat
export const createChat = tryCatch(async (req, res) => {

  let payload = req.body;

  payload.addedBy = req.auth.user._id;     // same pattern as Client
  payload.title = payload.title || "Nuevo chat";
  payload.messages = [];

  const newChat = new Chat(payload);
  await newChat.save();

  res.status(200).json({ 
    success: true, 
    message: 'Chat created successfully', 
    result: newChat 
  });
});


// Get Chats (with search + soft delete)
export const getChats = tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  };

  const { title } = req.query;

  if (title) {
    findData['title'] = { $regex: title, $options: 'i' };
  }

  const chats = await Chat.find(findData)
    .populate([{ path: 'addedBy', model: 'users' }])
    .sort({ updatedAt: -1 });

  res.status(200).json({ 
    success: true, 
    result: chats 
  });
});


// Get Single Chat
export const getChatById = tryCatch(async (req, res) => {

  const chat = await Chat.findOne({
    _id: req.params.chatId,
    isDelete: false
  });

  if (!chat) {
    return res.status(404).json({ success: false, message: 'Chat not found' });
  }

  res.status(200).json({ success: true, result: chat });
});


// Add Message to Chat
export const addMessage = tryCatch(async (req, res) => {

  console.log("req.body",req.body)
  const { sender, text } = req.body;
  // console.log("Sender",sender,text)

  if (!sender || !text) {
    return res
      .status(400)
      .json({ success: false, message: 'sender and text are required' });
  }

  const chat = await Chat.findOne({
    _id: req.params.chatId,
    isDelete: false
  });

  if (!chat) {
    return res.status(404).json({ success: false, message: 'Chat not found' });
  }

  // First message → set title
  if (chat.messages.length === 0) {
    chat.title = text.slice(0, 40);
  }

  chat.messages.push({
    sender,
    text,
    timestamp: new Date()
  });

  chat.updatedAt = new Date();

  await chat.save();

  res.status(200).json({ 
    success: true, 
    message: 'Message added successfully',
    result: chat 
  });
});


// Soft Delete Chat
export const deleteChat = tryCatch(async (req, res) => {

  let updateData = {
    $set: { isDelete: true }
  };

  let findChat = {
    _id: req.params.chatId
  };

  await Chat.updateOne(findChat, updateData);

  res.status(200).json({ 
    success: true, 
    message: 'Chat deleted successfully' 
  });
});

