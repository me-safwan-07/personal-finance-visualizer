"use client";

import { useState, useEffect } from "react";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions").then((res) =>
      res.json().then((data) => setTransactions(data))
    );
  }, []);

  return (
    <ul>
      {transactions.map((t) => (
        <li key={t._id}>
          {t.description} - ${t.amount} on {new Date(t.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
