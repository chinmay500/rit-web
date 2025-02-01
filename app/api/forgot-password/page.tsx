"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-hot-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"email" | "verify" | "reset">("email")
  const router = useRouter()

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Verification code sent to your email")
        setStep("verify")
      } else {
        toast.error(data.message || "An error occurred")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Code verified successfully")
        setStep("reset")
      } else {
        toast.error(data.message || "Invalid verification code")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Password reset successfully")
        router.push("/faculty-auth")
      } else {
        toast.error(data.message || "An error occurred")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center px-4">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image src="/logorit.png" alt="College Logo" width={100} height={100} className="mx-auto" />
          </motion.div>
          <motion.h2
            className="mt-6 text-3xl font-extrabold text-primary-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Reset Your Password
          </motion.h2>
        </div>

        {step === "email" && (
          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmitEmail}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </motion.form>
        )}

        {step === "verify" && (
          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleVerifyCode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <Label htmlFor="verificationCode" className="sr-only">
                Verification Code
              </Label>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </motion.form>
        )}

        {step === "reset" && (
          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleResetPassword}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <Label htmlFor="newPassword" className="sr-only">
                New Password
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </motion.form>
        )}

        <div className="text-center mt-4">
          <Link
            href="/faculty-auth"
            className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

