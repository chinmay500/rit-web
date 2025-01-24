import { Chatbot } from '@/components/Chatbot'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link'

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="flex-grow flex items-center justify-center p-4">
      
        <Chatbot />
        
      </main>
    </div>
  )
}

