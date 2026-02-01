import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    funcion: { type: String,default: "" },
    categoria: { type: String,default: "" },
    avance: { type: String, default: "" },
    fase: { type: String, default: "" },
    comentarios: { type: String, default: "" },
    cost: { type: String},
    addedBy: {
      type: mongoose.Schema.Types.ObjectId
    },

    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
