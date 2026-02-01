import mongoose from 'mongoose';


const codeSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    subFase: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const Code = mongoose.model('codes', codeSchema);
export default Code;