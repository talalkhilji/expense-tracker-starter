import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { groupExpensesByCategory } from './spendingUtils.js'
import { colorForCategory } from './categoryColors.js'

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
    return <p className="chart-empty">No expenses yet.</p>
  }

  return (
    <>
      <div className="chart-legend">
        {data.map(({ category }) => (
          <span className="chart-legend-item" key={category}>
            <span className="category-dot" style={{ background: colorForCategory(category) }} />
            {category}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e7e5e0" />
          <XAxis
            dataKey="category"
            tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
            axisLine={{ stroke: '#e7e5e0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={64}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fafaf8' }} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map(({ category }) => (
              <Cell key={category} fill={colorForCategory(category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default SpendingByCategory
