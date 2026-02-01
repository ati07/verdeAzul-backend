import mongoose from 'mongoose';


const VentasSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    clientId: { type: mongoose.Types.ObjectId },
    userId: { type: mongoose.Types.ObjectId },
    unitName: { type: String },
    fechaDeVenta: { type: Date },
    precioVenta: { type: String },
    financiamiento: { type: String },
    intereses: { type: String },
    precioTotalVenta: { type: String },
    contractFilepath: { type: String },
    identificationFilepath: { type: String },
    isEmailed: { type: Boolean, default: false },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

const Ventas = mongoose.model('ventas', VentasSchema);

export default Ventas
