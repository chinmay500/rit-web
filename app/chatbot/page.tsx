'use client'

// import { useRouter, useSearchParams } from 'next/navigation'
import { Chatbot } from '@/components/chatbot'

export default function ChatPage() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Chatbot />
    </div>
  )
}

