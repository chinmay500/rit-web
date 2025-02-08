// app/api/test-email/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.verify()

    return NextResponse.json({ success: true, message: 'SMTP configuration is correct' })
  } catch (error) {
    console.error('SMTP configuration error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'SMTP configuration failed', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}