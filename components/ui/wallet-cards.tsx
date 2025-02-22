'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export function WalletCards({ transactions }) {
  const totalExpenses = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const monthlyExpenses = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === thisMonth &&
        new Date(t.date).getFullYear() === thisYear
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const lastMonthExpenses = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === (thisMonth - 1 + 12) % 12 &&
        new Date(t.date).getFullYear() ===
          (thisMonth === 0 ? thisYear - 1 : thisYear)
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const monthlyChange =
    lastMonthExpenses === 0
      ? 0
      : ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">All time expenses</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Current month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${lastMonthExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Previous month total</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
          {monthlyChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-red-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-green-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {monthlyChange.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {monthlyChange >= 0 ? 'Increase' : 'Decrease'} from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}