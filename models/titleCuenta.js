import mongoose from 'mongoose';


const titleCuentaSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const TitleCuentaSchema = mongoose.model('titleCuenta', titleCuentaSchema);
export default TitleCuentaSchema;