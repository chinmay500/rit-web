'use server'

import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export type ContactFormResponse = {
  success: boolean
  message: string
  error?: string
}

async function createTransporter() {
  console.log('Starting createTransporter function')
  console.log('SMTP Configuration:')
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`)
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`)
  console.log(`SMTP_SECURE: ${process.env.SMTP_SECURE}`)
  console.log(`SMTP_USER: ${process.env.SMTP_USER ? 'Set' : 'Not set'}`)
  console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? 'Set' : 'Not set'}`)
  console.log(`MAIL_FROM: ${process.env.MAIL_FROM}`)

  try {
    console.log('Creating nodemailer transporter')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    console.log('Verifying transporter')
    await transporter.verify()
    console.log('Transporter verified successfully')
    return transporter
  } catch (error) {
    console.error('Error in createTransporter:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return null
  }
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  console.log('Server: Received form data:', formData)

  try {
    const validatedData = contactFormSchema.parse(formData)
    console.log('Server: Validation passed')

    const emailContent = `
      New Contact Form Submission

      Name: ${validatedData.name}
      Email: ${validatedData.email}
      Phone: ${validatedData.phone}
      
      Message:
      ${validatedData.message}
      
      Submitted at: ${new Date().toLocaleString()}
    `

    console.log('Creating email transporter')
    const transporter = await createTransporter()
    if (!transporter) {
      console.error('Failed to create email transporter')
      return {
        success: false,
        message: 'There was a problem sending your message. Please try again later.',
        error: 'Failed to create email transporter'
      }
    }

    try {
      console.log('Sending email')
      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.SMTP_USER,
        subject: 'New Contact Form Submission - RITP',
        text: emailContent,
      })
      console.log('Server: Email sent successfully', info)
      return {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!'
      }
    } catch (emailError) {
      console.error('Server: Error sending email:', emailError)
      if (emailError instanceof Error) {
        console.error('Error name:', emailError.name)
        console.error('Error message:', emailError.message)
        console.error('Error stack:', emailError.stack)
      }
      return {
        success: false,
        message: 'Failed to send email',
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      }
    }
  } catch (error) {
    console.error('Server: Form submission error:', error)
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => `${err.path}: ${err.message}`).join(', ')
      return {
        success: false,
        message: `Validation failed: ${errorMessage}`,
        error: errorMessage
      }
    }
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return {
      success: false,
      message: 'There was a problem submitting your form. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

