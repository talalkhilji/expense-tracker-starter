import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { groupExpensesByCategory } from './spendingUtils.js'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value">${payload[0].value.toLocaleString()}</p>
    </div>
  )
}

function SpendingByCategory({ transactions }) {
  const data = groupExpensesByCategory(transactions)

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expenses yet.</p>
      </div>
    )
  }

  return (
    <div className="chart-card">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e1e0d9" />
          <XAxis
            dataKey="category"
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={64}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9f9f7' }} />
          <Bar dataKey="amount" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingByCategory
