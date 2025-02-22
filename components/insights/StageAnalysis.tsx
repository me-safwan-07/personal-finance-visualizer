'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TTransaction } from "@/types/transaction";

interface StageAnalysisProps {
  transactions: TTransaction[];
}

export default function StageAnalysis({ 
  transactions 
}: StageAnalysisProps) {
  interface StageStats {
    [key: string]: { count: number; amount: number };
  }
  
  const stageStats = transactions.reduce<StageStats>((acc, transaction) => {
    if (!acc[transaction.stage]) {
      acc[transaction.stage] = {
        count: 0,
        amount: 0,
      };
    }
    acc[transaction.stage].count += 1;
    acc[transaction.stage].amount += transaction.amount;
    return acc;
  }, {});

  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  const stages = [
    { id: 'pending', label: 'Pending', color: 'bg-yellow-500' },
    { id: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
    { id: 'completed', label: 'Completed', color: 'bg-green-500' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Stages Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stages.map((stage) => {
          const stats = stageStats[stage.id] || { count: 0, amount: 0 };
          const percentage = totalTransactions ? (stats.count / totalTransactions) * 100 : 0;
          const amountPercentage = totalAmount ? (stats.amount / totalAmount) * 100 : 0;

          return (
            <div key={stage.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{stage.label}</span>
                <span className="text-muted-foreground">
                  {stats.count} transactions (${stats.amount.toFixed(2)})
                </span>
              </div>
              <Progress value={percentage} className={stage.color} />
              <p className="text-xs text-muted-foreground">
                {percentage.toFixed(1)}% of transactions, {amountPercentage.toFixed(1)}% of total value
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}