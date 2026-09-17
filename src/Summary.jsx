function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <div className="balance-hero">
        <h3>Balance</h3>
        <p className={`balance-amount${balance < 0 ? ' negative' : ''}`}>
          {balance < 0 ? '-' : ''}${Math.abs(balance).toLocaleString()}
        </p>
      </div>
      <div className="summary-lines">
        <div className="summary-line">
          <h3>Income</h3>
          <p className="figure income-amount">+${totalIncome.toLocaleString()}</p>
        </div>
        <div className="summary-line">
          <h3>Expenses</h3>
          <p className="figure expense-amount">-${totalExpenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary
