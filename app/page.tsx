import ExpenseChart from "./components/ExpenseChart";
import TransactionForm from "./components/TransactioinsForm";
import TransactionList from "./components/TransactionList";


export default function Home() {
  return (
    <main>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm />
      <TransactionList />
      <ExpenseChart transactions={[]} />
    </main>
  );
}
