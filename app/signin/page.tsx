"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setIsOtpSent(true)
        toast.success("OTP sent to your email")
        console.log("OTP sent successfully")
      } else {
        toast.error(data.error || "Failed to send OTP")
        console.error("OTP send error details:", data.details)
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast.error("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      })
      console.log("Sign in response:", res)
      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          toast.error("Invalid OTP. Please try again.")
        } else {
          toast.error(res.error)
        }
        console.error("Sign in error:", res.error)
      } else if (res?.ok) {
        console.log("Sign in successful")
        router.push("/dashboard")
      } else {
        toast.error("An unexpected error occurred")
        console.error("Unexpected sign in result:", res)
      }
    } catch (error) {
      console.error("Error signing in:", error)
      toast.error("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Faculty Sign In</h1>
        <form onSubmit={isOtpSent ? handleSignIn : handleSendOtp}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {isOtpSent && (
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP (6-digit number)
              </label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                min="100000"
                max="999999"
              />
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isOtpSent ? "Sign In" : "Send OTP"}
          </motion.button>
        </form>
      </motion.div>
      <Toaster />
    </div>
  )
}

