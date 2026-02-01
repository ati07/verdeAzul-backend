import mongoose from 'mongoose';


const subPhaseSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const SubPhase = mongoose.model('subPhases', subPhaseSchema);
export default SubPhase;