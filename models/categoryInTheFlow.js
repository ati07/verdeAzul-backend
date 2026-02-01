import mongoose from 'mongoose';


const categoryInTheFlowSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CategoryInTheFlowSchema = mongoose.model('categoryInTheFlows', categoryInTheFlowSchema);
export default CategoryInTheFlowSchema;