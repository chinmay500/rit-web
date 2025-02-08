import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { otpService } from "@/lib/otpService"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 })
    }

    console.log(`Received OTP request for email: ${email}`)

    await otpService.cleanupExpiredOTPs()
    const otp = await otpService.generateOTP(email)

    console.log(`OTP generated for ${email}: ${otp}`)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (error) {
      console.error("SMTP connection verification failed:", error)
      return NextResponse.json(
        {
          success: false,
          error: "SMTP configuration error",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP for Faculty Sign In",
        text: `Your OTP is: ${otp}. This 6-digit number will expire in 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Your OTP for Faculty Sign In</h2>
            <p style="font-size: 16px; color: #666;">Your One-Time Password (OTP) is:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span>
            </div>
            <p style="color: #666;">This OTP will expire in 10 minutes.</p>
            <p style="color: #999; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
          </div>
        `,
      })
      console.log(`OTP email sent successfully to ${email}`)
    } catch (error) {
      console.error("Error sending OTP email:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send OTP email",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }

    console.log("OTP generation and email sending process completed successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in send-otp route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

