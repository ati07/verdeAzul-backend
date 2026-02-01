import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    company:{ type: String },
    name: { type: String },
    email:{ type: String },
    phoneNumber:{ type: String },
    address:{ type: String },
    description: { type: String },
    contractFilepath: { type: String },
    identificationFilepath: { type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Client = mongoose.model('clients', clientSchema);
export default Client;