import { useState } from 'react'
import './App.css'
import Summary from './Summary.jsx'
import SpendingByCategory from './SpendingByCategory.jsx'
import TransactionForm from './TransactionForm.jsx'
import TransactionList from './TransactionList.jsx'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const handleAddTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...transaction,
      },
    ]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="app">
      <header className="masthead">
        <div>
          <h1>Ledger</h1>
          <p className="subtitle">A running record of what comes in and what goes out.</p>
        </div>
        <span className="stamp">{today}</span>
      </header>

      <section className="section">
        <Summary transactions={transactions} />
      </section>

      <section className="section">
        <h2>Spending by category</h2>
        <SpendingByCategory transactions={transactions} />
      </section>

      <section className="section">
        <h2>New entry</h2>
        <TransactionForm categories={categories} onAdd={handleAddTransaction} />
      </section>

      <section className="section">
        <h2>Register</h2>
        <TransactionList transactions={transactions} categories={categories} onDelete={handleDeleteTransaction} />
      </section>
    </div>
  );
}

export default App
