import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  // Configure your email service here
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationCode(email: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Password Reset Verification Code",
    html: `
      <h1>Password Reset</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>This code will expire in 15 minutes.</p>
    `,
  })
}

