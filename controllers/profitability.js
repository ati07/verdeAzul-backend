import {Profitability} from "../models/profitability.js";

// @desc    Get all financial records
// @route   GET /api/financial
export const getProfitability = async (req, res) => {
  try {
    const records = await Profitability.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create multiple records (bulk insert)
// @route   POST /api/financial
export const createProfitability = async (req, res) => {
  try {
    const records = await Profitability.insertMany(req.body);
    res.status(201).json(records);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a record by ID
// @route   PUT /api/financial/:id
export const updateProfitability= async (req, res) => {
  try {
    const record = await Profitability.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a record
// @route   DELETE /api/financial/:id
export const deleteProfitability= async (req, res) => {
  try {
    const record = await Profitability.findOneAndDelete({ id: req.params.id });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
