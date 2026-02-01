import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Nuevo chat"
  },
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Chat", ChatSchema);
