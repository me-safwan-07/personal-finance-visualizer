import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [3, 'Description must be at least 3 characters long'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other'],
  },
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['expense', 'income'],
  },
  stage: {
    type: String,
    required: [true, 'Stage is required'],
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);