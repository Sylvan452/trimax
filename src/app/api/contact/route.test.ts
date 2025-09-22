import { NextRequest } from 'next/server'
import { POST } from './route'
import nodemailer from 'nodemailer'

// Mock nodemailer
jest.mock('nodemailer')
const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetAllMocks()
  process.env = {
    ...originalEnv,
    SMTP_HOST: 'smtp.test.com',
    SMTP_PORT: '587',
    SMTP_USER: 'test@example.com',
    SMTP_PASS: 'testpass',
    SMTP_FROM: 'noreply@trimax-media.com',
    CONTACT_EMAIL: 'contact@trimax-media.com',
  }
})

afterEach(() => {
  process.env = originalEnv
})

// Helper function to create mock request
function createMockRequest(body: Record<string, unknown>): NextRequest {
  return {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest
}

describe('/api/contact', () => {
  describe('POST', () => {
    const mockSendMail = jest.fn()
    const mockTransporter = {
      sendMail: mockSendMail,
    }

    beforeEach(() => {
      mockNodemailer.createTransport.mockReturnValue(mockTransporter as unknown as nodemailer.Transporter)
      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' })
    })

    it('successfully sends email with valid data', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.message).toBe('Email sent successfully')
      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.test.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })
      expect(mockSendMail).toHaveBeenCalledWith({
        from: 'noreply@trimax-media.com',
      to: 'contact@trimax-media.com',
        subject: 'New Contact Form Submission from John Doe',
        html: expect.stringContaining('John Doe'),
        text: expect.stringContaining('John Doe'),
      })
    })

    it('returns 400 for missing name', async () => {
      const invalidData = {
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('Validation failed')
      expect(responseData.details).toContain('Name is required')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('returns 400 for empty name', async () => {
      const invalidData = {
        name: '   ',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Name is required')
    })

    it('returns 400 for missing email', async () => {
      const invalidData = {
        name: 'John Doe',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Email is required')
    })

    it('returns 400 for invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Please enter a valid email address')
    })

    it('returns 400 for missing message', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Message is required')
    })

    it('returns 400 for message too short', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Message must be at least 10 characters long')
    })

    it('returns 400 for multiple validation errors', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        message: 'Short',
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toHaveLength(3)
      expect(responseData.details).toContain('Name is required')
      expect(responseData.details).toContain('Please enter a valid email address')
      expect(responseData.details).toContain('Message must be at least 10 characters long')
    })

    it('returns 500 when email sending fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }

      mockSendMail.mockRejectedValue(new Error('SMTP connection failed'))

      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Failed to send email')
      
      consoleSpy.mockRestore()
    })

    it('handles malformed JSON request', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const request = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as NextRequest

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Failed to send email')
      
      consoleSpy.mockRestore()
    })

    it('uses default SMTP configuration when env vars are missing', async () => {
      delete process.env.SMTP_HOST
      delete process.env.SMTP_PORT

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }

      const request = createMockRequest(validData)
      await POST(request)

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })
    })

    it('includes proper email content formatting', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message\nwith multiple lines.',
      }

      const request = createMockRequest(validData)
      await POST(request)

      const emailCall = mockSendMail.mock.calls[0][0]
      
      expect(emailCall.html).toContain('John Doe')
      expect(emailCall.html).toContain('john@example.com')
      expect(emailCall.html).toContain('This is a test message\nwith multiple lines.')
      expect(emailCall.html).toContain('New Contact Form Submission')
      
      expect(emailCall.text).toContain('John Doe')
      expect(emailCall.text).toContain('john@example.com')
      expect(emailCall.text).toContain('This is a test message\nwith multiple lines.')
    })

    it('validates data types correctly', async () => {
      const invalidData = {
        name: 123, // Should be string
        email: true, // Should be string
        message: [], // Should be string
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.details).toContain('Name is required')
      expect(responseData.details).toContain('Email is required')
      expect(responseData.details).toContain('Message is required')
    })
  })
})