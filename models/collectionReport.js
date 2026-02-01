import mongoose from 'mongoose';


const CollectionReportSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    bankId: { type: mongoose.Types.ObjectId },
    clientId: { type: mongoose.Types.ObjectId },
    userId: { type: mongoose.Types.ObjectId },
    cobroNumber: { type: String },
    estadoDelCobro: { type: String, default:"Pendiente" },
    reportDate: { type: Date },
    unitName: { type: String },
    collectionReportDate: { type: Date },
    entryDate: { type: Date },
    pagoCapital: { type: String },
    intereses: { type: String },
    totalCollection: { type: String },
    gastos: { type: String },
    fechaEntrada: { type: String },
    recibido: { type: String },
    typeOfPayment: { type: String },
    paymentDate: { type: Date },
    observation: { type: String },
    contractFilepath: { type: String },
    emailReminderCount: { type: Number, default: 0 },
    lastEmailReminderAt: { type: Date },
    isEmailedFromEntradas: { type: Boolean, default: false },
    isEmailedToClient: { type: Boolean, default: false },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CollectionReport = mongoose.model('collectionReports', CollectionReportSchema);

export default CollectionReport
