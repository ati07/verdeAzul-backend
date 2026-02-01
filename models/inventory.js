import mongoose from 'mongoose';

const inventorySchema = mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    clientId:{ type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    statusId:{ type: mongoose.Types.ObjectId },
    userId:{ type: mongoose.Types.ObjectId },
    typeId: { type: mongoose.Types.ObjectId  },
    code: { type: String },
    unitName:{ type: String },
    met2: { type: String },
    unitArea: { type: String },
    priceUnit: { type: String },
    priceList: { type: String },
    rooms: { type: String },
    view: { type: String, default: '' },
    comment:{ type: String },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Inventory = mongoose.model('inventories', inventorySchema);
export default Inventory;