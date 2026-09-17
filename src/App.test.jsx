import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it("assigns an id and today's date when a transaction is added", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Description'), 'Coffee')
    await user.type(screen.getByPlaceholderText('Amount'), '4.5')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const today = new Date().toISOString().split('T')[0]
    const row = screen.getByText('Coffee').closest('tr')
    expect(row).toHaveTextContent(today)
    expect(row).toHaveTextContent('-$4.5')
  })

  describe('deleting a transaction', () => {
    beforeEach(() => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
    })

    afterEach(() => {
      window.confirm.mockRestore()
    })

    it('removes the row from the table', async () => {
      const user = userEvent.setup()
      render(<App />)

      expect(screen.getByText('Rent')).toBeInTheDocument()

      const row = screen.getByText('Rent').closest('tr')
      await user.click(within(row).getByRole('button', { name: 'Delete' }))

      expect(screen.queryByText('Rent')).not.toBeInTheDocument()
    })
  })
})
