import mongoose from 'mongoose';


const categoryProjectSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CategoryProject = mongoose.model('categoryProjects', categoryProjectSchema);
export default CategoryProject;