import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import TransactionList from './TransactionList.jsx'

const categories = ['food', 'salary']

const transactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'salary', date: '2025-01-01' },
  { id: 2, description: 'Groceries', amount: 150, type: 'expense', category: 'food', date: '2025-01-02' },
]

describe('TransactionList', () => {
  it('renders every transaction by default', () => {
    render(<TransactionList transactions={transactions} categories={categories} onDelete={vi.fn()} />)

    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
  })

  it('filters by type', async () => {
    const user = userEvent.setup()
    render(<TransactionList transactions={transactions} categories={categories} onDelete={vi.fn()} />)

    await user.selectOptions(screen.getByDisplayValue('All Types'), 'income')

    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument()
  })

  it('filters by category', async () => {
    const user = userEvent.setup()
    render(<TransactionList transactions={transactions} categories={categories} onDelete={vi.fn()} />)

    await user.selectOptions(screen.getByDisplayValue('All Categories'), 'food')

    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.queryByText('Salary')).not.toBeInTheDocument()
  })

  describe('deleting', () => {
    beforeEach(() => {
      vi.spyOn(window, 'confirm')
    })

    afterEach(() => {
      window.confirm.mockRestore()
    })

    it('calls onDelete with the transaction id when the user confirms', async () => {
      window.confirm.mockReturnValue(true)
      const user = userEvent.setup()
      const onDelete = vi.fn()

      render(<TransactionList transactions={transactions} categories={categories} onDelete={onDelete} />)
      await user.click(screen.getAllByRole('button', { name: 'Delete' })[1])

      expect(window.confirm).toHaveBeenCalledWith('Delete "Groceries"?')
      expect(onDelete).toHaveBeenCalledWith(2)
    })

    it('does not call onDelete when the user cancels the confirmation', async () => {
      window.confirm.mockReturnValue(false)
      const user = userEvent.setup()
      const onDelete = vi.fn()

      render(<TransactionList transactions={transactions} categories={categories} onDelete={onDelete} />)
      await user.click(screen.getAllByRole('button', { name: 'Delete' })[1])

      expect(onDelete).not.toHaveBeenCalled()
    })
  })
})
