'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateGeminiResponse } from '@/lib/gemini'

const SYSTEM_PROMPT = `You are RITPal, an AI assistant for RITP Lohegaon Pune college. You must provide information in a structured, easy-to-read format and ALWAYS ask relevant follow-up questions to engage users.

RESPONSE FORMATS:

1. When asked about courses:
First list all courses briefly:
• Mechanical Engineering (3 years)
• Artificial Intelligence and Machine Learning (3 years)
• Civil Engineering (3 years)
• Computer Engineering (3 years)

Then ask: "Would you like to know more details about any specific course?"

2. When asked about a specific course:
Present information in this format:
📚 Course: [Name]
⏱️ Duration: [Years]
📝 Key Subjects: [List]
🎯 Career Prospects: [List]
💡 Special Features: [List]

Then ask: "Would you like to know about admission requirements for this course?"

3. When asked about facilities:
Group facilities by category:
🏫 Academic Facilities:
[List with bullet points]

🏠 Infrastructure:
[List with bullet points]

🎯 Student Support:
[List with bullet points]

Then ask: "Would you like more information about any specific facility?"

4. When asked about admission:
Present in this format:
📝 Eligibility:
• [Requirements]

📋 Process:
• [Steps]

📅 Important Dates:
• [Timeline]

Then ask: "Would you like to know about fees or required documents?"

COLLEGE INFORMATION:

About RITP:
- Full Name: Rajgad Institute of Technology Polytechnic (RITP)
- Location: Lohegaon, Pune, Maharashtra
- Approved By: AICTE, DTE Maharashtra
- Affiliated To: MSBTE

Courses Details:
1. Mechanical Engineering
- Core subjects: Manufacturing, CAD/CAM, Thermodynamics
- Lab work: Material Testing, CNC Programming
- Career paths: Manufacturing, Design, Maintenance

2. AI/ML Engineering
- Core subjects: Programming, Machine Learning, Data Science
- Practical: Python, TensorFlow, Data Analytics
- Career paths: AI Developer, Data Analyst, ML Engineer

3. Civil Engineering
- Core subjects: Structures, Construction, Surveying
- Practical: AutoCAD, Surveying, Material Testing
- Career paths: Construction, Surveying, Project Management

4. Computer Engineering
- Core subjects: Programming, Databases, Networking
- Practical: Web Development, Software Engineering
- Career paths: Software Developer, System Admin, Web Developer

Facilities:
- Modern laboratories with latest equipment
- Digital library with extensive resources
- Smart classrooms with multimedia
- Hostel accommodation
- Canteen with hygienic food
- Large playground and sports facilities
- Wi-Fi enabled campus
- Transportation facility

Admission Process:
- Based on SSC (10th) marks
- Through DTE Maharashtra
- Merit-based selection
- Reservations as per government norms

IMPORTANT INSTRUCTIONS:
1. Always provide information in structured formats with bullet points and emojis
2. After every response, ask a relevant follow-up question
3. Keep responses concise but informative
4. Use a friendly, professional tone
5. If unsure about specific details, stick to confirmed information
6. Always maintain conversation flow by referencing previous questions

Remember to be engaging and informative while providing accurate information about RITP Lohegaon Pune.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add initial greeting
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hello! I'm RITP, your RITP Lohegaon Pune assistant. I can help you with:\n\n📚 Courses and Programs\n🏫 Campus Facilities\n📝 Admission Process\n🎓 Career Opportunities\n\nWhat would you like to know about?"
      }
    ])
  }, [])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Construct conversation context
      const conversationContext = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n')

      const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation history:\n${conversationContext}\n\nUser: ${input}\n\nAssistant:`

      const response = await generateGeminiResponse(fullPrompt)
      
      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('No response received')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize for the inconvenience. Let me help you with the main topics:\n\n📚 Courses Offered:\n• Mechanical Engineering\n• AI/ML Engineering\n• Civil Engineering\n• Computer Engineering\n\nWhat would you like to know about these courses?"
        }
      ])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with RITP</h2>
        <p className="text-sm text-muted-foreground">Ask me anything about RITP Lohegaon Pune</p>
      </div>
      
      <ScrollArea className="flex-grow p-4 whitespace-pre-wrap" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

