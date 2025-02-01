import { NextResponse } from "next/server"
import { sendVerificationCode } from "@/lib/email"
import { getUserByEmail, storeVerificationCode } from "@/lib/db"

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    await storeVerificationCode(email, verificationCode)
    await sendVerificationCode(email, verificationCode)

    return NextResponse.json({ message: "Verification code sent" })
  } catch (error) {
    console.error("Error in forgot-password:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

