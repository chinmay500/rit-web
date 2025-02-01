"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Password reset successfully")
        router.push("/faculty-auth")
      } else {
        toast.error(data.message || "An error occurred")
      }
    } catch (error) {
        console.log(error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EBF5FF] flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pAUfZF2eSNWHGv48RKv4AuxBWeZ4Pu.png"
            alt="College Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-[#003366] mb-2">Set New Password</h1>
          <p className="text-gray-600 text-sm">Enter your new password below.</p>
        </div>

        <motion.form className="space-y-4" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold py-2 rounded transition-colors"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  )
}

