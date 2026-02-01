import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
  {
    addedBy: { type: mongoose.Types.ObjectId },
    accountNumber: { type: String },
    workProgressId: { type: mongoose.Types.ObjectId },
    categoryWorkProgressId: { type: mongoose.Types.ObjectId },
    projectWorkProgressId: { type: mongoose.Types.ObjectId },
    code: { type: String },
    description: { type: String },

    // Contrato
    contratoUn: { type: String },
    contratoCant: { type: String },
    contratoCostoUnitario: { type: String },
    contratoCostoTotal: { type: String },

    // Acumulado Casado
    acumuladoCasadoPercentage: { type: String },
    acumuladoCasadoCantidades: { type: String },
    acumuladoCasadoValor: { type: String },

    // Acumulado Anterior
    acumuladoAnteriorPercentage: { type: String },
    acumuladoAnteriorCantidades: { type: String },
    acumuladoAnteriorValor: { type: String },

    // Esta Cuenta
    estaCuentaPercentage: { type: String },
    estaCuentaCantidades: { type: String },
    estaCuentaValor: { type: String },

    // Saldo por Fracturar
    saldoPorFracturarPercentage: { type: String },
    saldoPorFracturarCantidades: { type: String },
    saldoPorFracturarValor: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const Account = mongoose.model("AccountSchema", AccountSchema);
export default Account;