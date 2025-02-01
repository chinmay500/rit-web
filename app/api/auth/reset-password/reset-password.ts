import { NextResponse } from "next/server"
import { verifyCode, updateUserPassword } from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const { email, verificationCode, newPassword } = await request.json()

  try {
    const isValid = await verifyCode(email, verificationCode)

    if (!isValid) {
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await updateUserPassword(email, hashedPassword)

    return NextResponse.json({ message: "Password reset successfully" })
  } catch (error) {
    console.error("Error in reset-password:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

