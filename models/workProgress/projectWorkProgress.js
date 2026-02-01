import mongoose from 'mongoose';


const projectWorkProgressSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    code: { type: String },
    accounts: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const ProjectWorkProgress = mongoose.model('ProjectWorkProgress', projectWorkProgressSchema);
export default ProjectWorkProgress;