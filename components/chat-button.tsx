'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg transition-all hover:scale-110"
      onClick={onClick}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Open Chat</span>
    </Button>
  )
}

