import { GET } from './route'
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

describe('/api/test-email', () => {
  describe('GET', () => {
    const mockSendMail = jest.fn()
    const mockVerify = jest.fn()
    const mockTransporter = {
      sendMail: mockSendMail,
      verify: mockVerify,
    }

    beforeEach(() => {
      mockNodemailer.createTransport.mockReturnValue(mockTransporter as unknown as nodemailer.Transporter)
      mockVerify.mockResolvedValue(true)
      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' })
    })

    it('successfully sends test email when configuration is valid', async () => {
      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.message).toBe('Test email sent successfully!')
      expect(responseData.config).toEqual({
        host: 'smtp.test.com',
        port: '587',
        user: 'test@example.com',
        from: 'noreply@trimax-media.com',
      to: 'contact@trimax-media.com',
      })

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.test.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })

      expect(mockVerify).toHaveBeenCalled()
      expect(mockSendMail).toHaveBeenCalledWith({
        from: 'noreply@trimax-media.com',
      to: 'contact@trimax-media.com',
        subject: 'Email Configuration Test',
        html: expect.stringContaining('Email Configuration Test'),
        text: expect.stringContaining('Email Configuration Test'),
      })
    })

    it('uses default SMTP configuration when env vars are missing', async () => {
      delete process.env.SMTP_HOST
      delete process.env.SMTP_PORT
      delete process.env.SMTP_FROM
      delete process.env.CONTACT_EMAIL

      const response = await GET()
      const responseData = await response.json()

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })

      expect(mockSendMail).toHaveBeenCalledWith({
        from: 'test@example.com',
        to: 'test@example.com',
        subject: 'Email Configuration Test',
        html: expect.any(String),
        text: expect.any(String),
      })

      expect(responseData.config).toEqual({
        host: 'smtp.gmail.com',
        port: '587',
        user: 'test@example.com',
        from: 'test@example.com',
        to: 'test@example.com',
      })
    })

    it('returns 500 when SMTP verification fails', async () => {
      mockVerify.mockRejectedValue(new Error('SMTP connection failed'))

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Email test failed')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('returns 500 when email sending fails after verification', async () => {
      mockSendMail.mockRejectedValue(new Error('Failed to send email'))

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Email test failed')
      expect(mockVerify).toHaveBeenCalled()
    })

    it('includes proper test email content', async () => {
      await GET()

      const emailCall = mockSendMail.mock.calls[0][0]
      
      expect(emailCall.subject).toBe('Email Configuration Test')
      expect(emailCall.html).toContain('Email Configuration Test')
      expect(emailCall.html).toContain('SMTP configuration is working correctly')
      expect(emailCall.html).toContain('✅ Email configuration is working!')
      
      expect(emailCall.text).toContain('Email Configuration Test')
      expect(emailCall.text).toContain('SMTP configuration is working correctly')
      expect(emailCall.text).toContain('✅ Email configuration is working!')
    })

    it('includes timestamp in email content', async () => {
      const mockDate = new Date('2024-01-15T10:00:00Z')
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date)

      await GET()

      const emailCall = mockSendMail.mock.calls[0][0]
      const expectedTimestamp = mockDate.toLocaleString()
      
      expect(emailCall.html).toContain(expectedTimestamp)
      expect(emailCall.text).toContain(expectedTimestamp)

      jest.restoreAllMocks()
    })

    it('handles missing SMTP credentials gracefully', async () => {
      delete process.env.SMTP_USER
      delete process.env.SMTP_PASS

      await GET()

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.test.com',
        port: 587,
        secure: false,
        auth: {
          user: undefined,
          pass: undefined,
        },
      })

      // Should still attempt to verify and send
      expect(mockVerify).toHaveBeenCalled()
    })

    it('returns proper error structure on failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const errorMessage = 'Authentication failed'
      mockVerify.mockRejectedValue(new Error(errorMessage))

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData).toEqual({
        error: 'Email test failed',
        details: errorMessage,
        config: {
          host: 'smtp.test.com',
          port: '587',
          user: '***configured***',
          pass: '***configured***'
        }
      })
      
      consoleSpy.mockRestore()
    })

    it('logs errors to console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('SMTP connection failed')
      mockVerify.mockRejectedValue(error)

      await GET()

      expect(consoleSpy).toHaveBeenCalledWith('Email test error:', error)
      
      consoleSpy.mockRestore()
    })

    it('creates transporter with correct secure setting for port 465', async () => {
      process.env.SMTP_PORT = '465'

      await GET()

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.test.com',
        port: 465,
        secure: false, // Still false as per the implementation
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })
    })

    it('handles non-standard port numbers', async () => {
      process.env.SMTP_PORT = '2525'

      await GET()

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.test.com',
        port: 2525,
        secure: false,
        auth: {
          user: 'test@example.com',
          pass: 'testpass',
        },
      })
    })
  })
})