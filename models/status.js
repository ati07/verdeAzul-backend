import mongoose from 'mongoose';


const statusSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const StatusSchema = mongoose.model('status', statusSchema);
export default StatusSchema;