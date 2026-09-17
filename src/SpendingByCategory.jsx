import { groupExpensesByCategory } from './spendingUtils.js'

function SpendingByCategory({ transactions }) {
  const data = groupExpensesByCategory(transactions)

  if (data.length === 0) {
    return <p className="chart-empty">No expenses yet.</p>
  }

  return (
    <div className="envelopes">
      {data.map(({ category, amount }) => (
        <div className="envelope" key={category}>
          <div className="envelope-flap" />
          <div className="envelope-body">
            <span className="envelope-category">{category}</span>
            <span className="envelope-amount">${amount.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SpendingByCategory
