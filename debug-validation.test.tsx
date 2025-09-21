import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './src/app/contact/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('Debug ContactForm Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Success' }),
    })
  })

  it('debug validation flow', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    console.log('Before clicking submit')
    await user.click(submitButton)
    console.log('After clicking submit')
    
    // Log the entire DOM to see what's rendered
    console.log('DOM after submit:', document.body.innerHTML)
    
    // Check if any error text exists
    const errorElements = screen.queryAllByText(/required/i)
    console.log('Error elements found:', errorElements.length)
    
    errorElements.forEach((el, index) => {
      console.log(`Error ${index}:`, el.textContent)
    })
    
    // Wait a bit and check again
    await waitFor(() => {
      const nameError = screen.queryByText('Name is required')
      console.log('Name error found:', !!nameError)
      if (nameError) {
        console.log('Name error element:', nameError.outerHTML)
      }
    }, { timeout: 3000 })
  })
})