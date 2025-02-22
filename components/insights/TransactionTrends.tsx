'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { TTransaction } from "@/types/transaction";

interface TransactionTrendsProps {
  transactions: TTransaction[];
}
export default function TransactionTrends({ 
  transactions 
}: TransactionTrendsProps) {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
      month: format(date, 'MMM yyyy'),
    };
  }).reverse();

  const monthlyData = last6Months.map(({ start, end, month }) => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= start && date <= end;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      income,
      expenses,
      savings: income - expenses,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>6-Month Financial Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => typeof value === 'number' ? `${value.toFixed(2)}` : value} />
              <Line type="monotone" dataKey="income" stroke="hsl(var(--chart-1))" name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-2))" name="Expenses" />
              <Line type="monotone" dataKey="savings" stroke="hsl(var(--chart-3))" name="Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}