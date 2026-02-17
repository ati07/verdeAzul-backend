import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    email:{ type: String },
    phoneNumber:{ type: String },
    description: { type: String },
    identificacion: { type: String },
    clientDocuments: [],
    isComplete: { type: Boolean },
    comment: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Client = mongoose.model('clients', clientSchema);
export default Client;