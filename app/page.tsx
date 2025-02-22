'use client';

import { useState, useEffect } from 'react';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import MonthlyExpenseChart from '@/components/MonthlyExpenseChart';
import CategoryBreakdown from '@/components/insights/CategoryBreakdown';
import TransactionTrends from '@/components/insights/TransactionTrends';
import StageAnalysis from '@/components/insights/StageAnalysis';
import FinancialSummary from '@/components/insights/FinancialSummary';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletCards } from '@/components/ui/wallet-cards';
import { useToast } from '@/components/ui/use-toast';
import { TransactionFormData } from '@/types/transaction';


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch transactions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: TransactionFormData) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      
      if (!response.ok) throw new Error('Failed to add transaction');
      
      await fetchTransactions();
      toast({
        title: 'Success',
        description: 'Transaction added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add transaction',
        variant: 'destructive',
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete transaction');
      
      await fetchTransactions();
      toast({
        title: 'Success',
        description: 'Transaction deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete transaction',
        variant: 'destructive',
      });
    }
  };

  const editTransaction = async (id: string, updatedTransaction: TransactionFormData) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });
      
      if (!response.ok) throw new Error('Failed to update transaction');
      
      await fetchTransactions();
      toast({
        title: 'Success',
        description: 'Transaction updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update transaction',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Personal Finance Visualizer
        </h1>

        <WalletCards transactions={transactions} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Overview</h2>
            <MonthlyExpenseChart transactions={transactions} />
          </Card>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Transaction List</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card className="p-6">
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
                onEdit={editTransaction}
              />
            </Card>
          </TabsContent>
          <TabsContent value="insights">
            <div className="space-y-6">
              <FinancialSummary transactions={transactions} />
              
              <div className="grid gap-6 md:grid-cols-2">
                <CategoryBreakdown transactions={transactions} />
                <StageAnalysis transactions={transactions} />
              </div>
              
              <TransactionTrends transactions={transactions} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}