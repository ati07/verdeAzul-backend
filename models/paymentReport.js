import mongoose from 'mongoose';


const PaymentReportSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    projectId : { type: mongoose.Types.ObjectId },
    providerId : { type: mongoose.Types.ObjectId },
    projectCategoryId: { type: mongoose.Types.ObjectId },
    codeId: { type: mongoose.Types.ObjectId },
    subFase: { type: String },
    userId: { type: mongoose.Types.ObjectId },
    requestedById: { type: mongoose.Types.ObjectId},
    week: { type: String },
    date: { type: Date },
    total: { type: String },
    invoiceDescription: { type: String },
    comment: {type: String},
    orderNo: { type: String },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const PaymentReport = mongoose.model('paymentReports', PaymentReportSchema);

export default PaymentReport
