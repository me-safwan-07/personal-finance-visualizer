"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface Transaction {
  date: string;
  amount: number;
}

export default function ExpenseChart({ transactions }: { transactions: Transaction[] }) {
  const data = transactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
  }));

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}
