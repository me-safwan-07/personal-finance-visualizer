'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TTransaction } from "@/types/transaction";
import { ArrowUpCircle, ArrowDownCircle, Wallet, TrendingUp } from "lucide-react";

interface FinancialSummaryProps {
  transactions: TTransaction[];
}
export default function FinancialSummary({ 
  transactions 
}: FinancialSummaryProps) {
  const stats = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') { 
      acc.totalIncome += transaction.amount;
    } else {
      acc.totalExpenses += transaction.amount;
    }
    return acc;
  }, {
    totalIncome: 0,
    totalExpenses: 0,
  });

  const netSavings = stats.totalIncome - stats.totalExpenses;
  const savingsRate = stats.totalIncome ? (netSavings / stats.totalIncome) * 100 : 0;

  const items = [
    {
      title: "Total Income",
      value: `${stats.totalIncome.toFixed(2)}`,
      icon: ArrowUpCircle,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: `${stats.totalExpenses.toFixed(2)}`,
      icon: ArrowDownCircle,
      color: "text-red-500",
    },
    {
      title: "Net Savings",
      value: `${netSavings.toFixed(2)}`,
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}