// Simple debug test
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './src/app/contact/ContactForm'

test('debug validation', async () => {
  const user = userEvent.setup()
  render(<ContactForm />)
  
  // Fill form with invalid email
  const nameInput = screen.getByLabelText(/full name/i)
  const emailInput = screen.getByLabelText(/email address/i)
  const messageInput = screen.getByLabelText(/message/i)
  const submitButton = screen.getByRole('button', { name: /send message/i })
  
  await user.type(nameInput, 'John Doe')
  await user.type(emailInput, 'invalid-email')
  await user.type(messageInput, 'This is a test message that is long enough.')
  
  console.log('Before submit - DOM:', document.body.innerHTML)
  
  await user.click(submitButton)
  
  console.log('After submit - DOM:', document.body.innerHTML)
  
  // Check if any error text exists
  const errorElements = screen.queryAllByText(/error|invalid|required/i)
  console.log('Error elements found:', errorElements.map(el => el.textContent))
})