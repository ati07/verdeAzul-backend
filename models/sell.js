import mongoose from 'mongoose';


const SellSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    inventoryId: { type: mongoose.Types.ObjectId },
    clientId: { type: mongoose.Types.ObjectId },
    unitName: { type: String },
    salePrice: { type: Date },
    initialPayment: { type: String },
    subscriptionDate: { type: String },
    seller: { type: String },
    typeOfPayment: { type: Date },
    signatureDate: { type: String },
    payments: [],
    Identifications:{ type: String },
    KYC: { type: String },
    OtherDocuemnts: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const Sell = mongoose.model('Sells', SellSchema);
export default Sell;