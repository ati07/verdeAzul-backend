import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    code: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{timestamps: true});

const categoryWorkProgress = mongoose.model('CategoryWorkProgress', categorySchema);
export default categoryWorkProgress;