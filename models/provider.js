import mongoose from 'mongoose';

const providerSchema = mongoose.Schema(
  {
    name: { type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    phoneNumber: { type: String }, // Assuming phone number as a string to handle different formats
    // email: { type: String, required: true, unique: true },
    email: { type: String },
    serviceType: { type: String },
    contactPerson: { type: String },
    projectId: { type: mongoose.Types.ObjectId },
    snCode: { type: String },
    snName: { type: String },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const Provider = mongoose.model('providers', providerSchema);
export default Provider;
