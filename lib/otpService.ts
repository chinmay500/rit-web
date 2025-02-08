import { randomInt, createHash } from "crypto"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

interface OTP {
  hashedValue: string
  expiresAt: number
}

interface SessionData {
  otps: { [email: string]: OTP }
}

declare module "iron-session" {
  interface IronSessionData {
    otps: { [email: string]: OTP }
  }
}

const sessionOptions = {
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieName: "faculty-event-management",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

class OTPService {
  private static instance: OTPService
  private readonly OTP_EXPIRATION = 1800000 // 30 minutes in milliseconds

  private constructor() {
    console.log("OTPService initialized with session-based storage")
  }

  public static getInstance(): OTPService {
    if (!OTPService.instance) {
      OTPService.instance = new OTPService()
    }
    return OTPService.instance
  }

  private hashOTP(otp: string, email: string): string {
    return createHash("sha256").update(`${otp}${email}`).digest("hex")
  }

  async generateOTP(email: string): Promise<string> {
    const otp = randomInt(100000, 999999).toString().padStart(6, "0")
    const hashedOTP = this.hashOTP(otp, email)

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    if (!session.otps) {
      session.otps = {}
    }

    session.otps[email] = {
      hashedValue: hashedOTP,
      expiresAt: Date.now() + this.OTP_EXPIRATION,
    }

    await session.save()

    console.log(`OTP generated for ${email}, expires in ${this.OTP_EXPIRATION / 60000} minutes`)
    console.log(`Current OTPs in storage: ${Object.keys(session.otps).length}`)

    return otp
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    console.log(`Attempting to verify OTP for ${email}`)

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    console.log(`Current OTPs in storage: ${Object.keys(session.otps || {}).length}`)

    const storedOTP = session.otps?.[email]

    if (storedOTP) {
      const hashedInputOTP = this.hashOTP(otp, email)

      if (storedOTP.hashedValue === hashedInputOTP && storedOTP.expiresAt > Date.now()) {
        delete session.otps[email]
        await session.save()
        console.log(`OTP verified successfully for ${email}`)
        return true
      } else {
        console.log(`OTP verification failed for ${email}. Invalid OTP or expired.`)
        console.log(`Stored hashed OTP: ${storedOTP.hashedValue}`)
        console.log(`Input hashed OTP: ${hashedInputOTP}`)
        console.log(`OTP expiration: ${new Date(storedOTP.expiresAt).toISOString()}`)
        console.log(`Current time: ${new Date().toISOString()}`)
      }
    } else {
      console.log(`No OTP found for ${email}`)
    }

    return false
  }

  async cleanupExpiredOTPs(): Promise<void> {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    if (!session.otps) {
      return
    }

    const now = Date.now()
    const expiredEmails = Object.keys(session.otps).filter((email) => session.otps[email].expiresAt <= now)

    expiredEmails.forEach((email) => {
      delete session.otps[email]
    })

    await session.save()

    if (expiredEmails.length > 0) {
      console.log(`Cleaned up expired OTPs for: ${expiredEmails.join(", ")}`)
    }
    console.log(`Remaining OTPs after cleanup: ${Object.keys(session.otps).length}`)
  }
}

export const otpService = OTPService.getInstance()

