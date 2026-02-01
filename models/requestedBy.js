import mongoose from 'mongoose';


const requestedBySchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const RequestedBy = mongoose.model('requesteds', requestedBySchema);
export default RequestedBy;