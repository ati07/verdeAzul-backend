import mongoose from 'mongoose';

const WorkProgressSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    categoryWorkProgressId: { type: mongoose.Types.ObjectId },
    projectWorkProgressId: { type: mongoose.Types.ObjectId },
    code: { type: String},
    description: { type: String},
    costoTotal: { type: String},
    acumulado: { type: String},
    valor: { type: String},
    // isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const WorkProgress = mongoose.model("WorkProgress", WorkProgressSchema);
export default WorkProgress;
