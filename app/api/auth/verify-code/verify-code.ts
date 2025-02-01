import { NextResponse } from "next/server"
import { verifyCode } from "@/lib/db"

export async function POST(request: Request) {
  const { email, verificationCode } = await request.json()

  try {
    const isValid = await verifyCode(email, verificationCode)

    if (isValid) {
      return NextResponse.json({ message: "Code verified successfully" })
    } else {
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in verify-code:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

