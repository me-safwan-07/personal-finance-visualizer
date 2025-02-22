'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { TTransaction } from '@/types/transaction';

interface MonthlyExpenseChartProps {
  transactions: TTransaction[];
}

export default function MonthlyExpenseChart({ 
  transactions 
}: MonthlyExpenseChartProps) {
  const monthlyData = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const month = format(new Date(transaction.date), 'MMM yyyy');
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += transaction.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(2)}`, 'Total Expenses']}
          />
          <Bar dataKey="total" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}