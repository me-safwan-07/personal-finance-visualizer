import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  description: string;
  date: Date;
}

const TransactionSchema = new Schema<Transaction>({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
