import mongoose from 'mongoose';


const typeSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const TypeSchema = mongoose.model('types', typeSchema);
export default TypeSchema;