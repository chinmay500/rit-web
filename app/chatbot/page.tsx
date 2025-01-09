'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Chatbot } from '@/components/chatbot'

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/'

  const handleClose = () => {
    router.push(returnTo)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Chatbot onClose={handleClose} />
    </div>
  )
}

