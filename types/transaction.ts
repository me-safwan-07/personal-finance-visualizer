// Transaction Types
export type TransactionType = 'expense' | 'income';

export type TransactionCategory = 
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Utilities'
  | 'Entertainment'
  | 'Shopping'
  | 'Healthcare'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: TransactionCategory;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

// Form Types
export interface TransactionFormData {
  amount: string;
  description: string;
  date: Date;
  category: TransactionCategory;
  type: TransactionType;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface TransactionResponse extends ApiResponse<Transaction> {}
export interface TransactionsResponse extends ApiResponse<Transaction[]> {}

// Chart Data Types
export interface ChartData {
  month: string;
  total: number;
}

// Component Props Types
export interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, transaction: Partial<Transaction>) => Promise<void>;
}

export interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => Promise<void>;
  initialData?: Partial<TransactionFormData>;
}

export interface MonthlyExpenseChartProps {
  transactions: Transaction[];
}

// Wallet Card Types
export interface WalletCardData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
}