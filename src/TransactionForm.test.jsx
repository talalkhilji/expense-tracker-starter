import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TransactionForm from './TransactionForm.jsx'

const categories = ['food', 'salary']

describe('TransactionForm', () => {
  it('submits a coerced numeric amount and resets the form', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TransactionForm categories={categories} onAdd={onAdd} />)

    await user.type(screen.getByLabelText('Description'), 'Coffee')
    await user.type(screen.getByLabelText('Amount'), '4.5')
    await user.click(screen.getByRole('button', { name: 'Record entry' }))

    expect(onAdd).toHaveBeenCalledTimes(1)
    const submitted = onAdd.mock.calls[0][0]
    expect(submitted.description).toBe('Coffee')
    expect(submitted.amount).toBe(4.5)
    expect(typeof submitted.amount).toBe('number')

    expect(screen.getByLabelText('Description')).toHaveValue('')
    expect(screen.getByLabelText('Amount')).toHaveValue(null)
  })

  it('does not call onAdd when description or amount is missing', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TransactionForm categories={categories} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: 'Record entry' }))

    expect(onAdd).not.toHaveBeenCalled()
  })
})
