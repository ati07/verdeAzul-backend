// import { RepaymentAndDisbursements } from "../models/repaymentAndDisbursements";

import { RepaymentAndDisbursements } from "../models/repaymentAndDisbursements.js";

// CREATE
export const createFinancial = async (req, res) => {
  try {
    const financial = new RepaymentAndDisbursements(req.body);
    await financial.save();
    res.status(201).json(financial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
export const getFinancials = async (req, res) => {
  try {
    const financials = await RepaymentAndDisbursements.find();
    res.json(financials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE (by ID)
export const getFinancialById = async (req, res) => {
  try {
    const financial = await RepaymentAndDisbursements.findById(req.params.id);
    if (!financial) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.json(financial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE

function flattenObject(obj, prefix = '') {
  let flat = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flat, flattenObject(obj[key], prefix + key + '.'));
    } else {
      flat[prefix + key] = obj[key];
    }
  }
  return flat;
}
export const updateFinancial = async (req, res) => {
  try {
    delete req.body._id; // Prevent updating _id
    const flatUpdate = flattenObject(req.body);
    const updated = await RepaymentAndDisbursements.findByIdAndUpdate(
      req.params.id,
      { $set: flatUpdate },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteFinancial = async (req, res) => {
  try {
    const deleted = await RepaymentAndDisbursements.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.json({ message: "Financial record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getOrCreateByYear = async (req, res) => {
  const year = req.params.year;

  try {
    let doc = await RepaymentAndDisbursements.findOne({ year });

    if (!doc) {
      doc = new RepaymentAndDisbursements({
        year,
        mensuales: {
          desembolsos: {},
          repagos: {},
        },
        acumulados: {
          desembolsos: {},
          repagos: {},
          saldo: {},
        },
      });

      await doc.save();
    }

    res.json([doc]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
