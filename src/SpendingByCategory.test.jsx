import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SpendingByCategory from './SpendingByCategory.jsx'
import { groupExpensesByCategory } from './spendingUtils.js'

describe('groupExpensesByCategory', () => {
  it('sums expenses per category, ignores income, and sorts by amount descending', () => {
    const transactions = [
      { id: 1, type: 'expense', amount: 100, category: 'food' },
      { id: 2, type: 'expense', amount: 50, category: 'food' },
      { id: 3, type: 'expense', amount: 300, category: 'transport' },
      { id: 4, type: 'income', amount: 5000, category: 'salary' },
    ]

    expect(groupExpensesByCategory(transactions)).toEqual([
      { category: 'transport', amount: 300 },
      { category: 'food', amount: 150 },
    ])
  })

  it('returns an empty array when there are no expenses', () => {
    const transactions = [{ id: 1, type: 'income', amount: 1000, category: 'salary' }]

    expect(groupExpensesByCategory(transactions)).toEqual([])
  })
})

describe('SpendingByCategory', () => {
  it('shows an empty state when there are no expenses', () => {
    const transactions = [{ id: 1, type: 'income', amount: 1000, category: 'salary' }]

    render(<SpendingByCategory transactions={transactions} />)

    expect(screen.getByText('No expenses yet.')).toBeInTheDocument()
  })

  it('renders a chart instead of the empty state once there is an expense', () => {
    const transactions = [{ id: 1, type: 'expense', amount: 100, category: 'food' }]

    const { container } = render(<SpendingByCategory transactions={transactions} />)

    expect(screen.queryByText('No expenses yet.')).not.toBeInTheDocument()
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
  })
})
