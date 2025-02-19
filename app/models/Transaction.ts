import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  category: { type: String, enum: ["Food", "Rent", "Travel", "Others"], default: "Others" }
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
