import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    empresa: { type: String },
    ruc: { type: String },
    dv: { type : String },
    managerName: { type : String },
    managerEmail: { type : String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{timestamps: true});

const Project = mongoose.model('projects', projectSchema);
export default Project;