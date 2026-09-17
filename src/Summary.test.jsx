import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Summary from './Summary.jsx'

describe('Summary', () => {
  it('sums income, expenses, and balance separately', () => {
    const transactions = [
      { id: 1, type: 'income', amount: 1000 },
      { id: 2, type: 'income', amount: 500 },
      { id: 3, type: 'expense', amount: 200 },
      { id: 4, type: 'expense', amount: 100 },
    ]

    render(<Summary transactions={transactions} />)

    expect(screen.getByText('$1500')).toBeInTheDocument()
    expect(screen.getByText('$300')).toBeInTheDocument()
    expect(screen.getByText('$1200')).toBeInTheDocument()
  })

  it('renders zeros for an empty transaction list', () => {
    render(<Summary transactions={[]} />)

    const amounts = screen.getAllByText('$0')
    expect(amounts).toHaveLength(3)
  })

  it('allows balance to go negative when expenses exceed income', () => {
    const transactions = [
      { id: 1, type: 'income', amount: 100 },
      { id: 2, type: 'expense', amount: 300 },
    ]

    render(<Summary transactions={transactions} />)

    expect(screen.getByText('$-200')).toBeInTheDocument()
  })
})
