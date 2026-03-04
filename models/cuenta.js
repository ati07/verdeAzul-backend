import mongoose from 'mongoose';


const cuentaSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CuentaSchema = mongoose.model('cuenta', cuentaSchema);
export default CuentaSchema;