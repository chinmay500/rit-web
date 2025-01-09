'use client'

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { generateGeminiResponse } from '@/lib/gemini'
import {  RotateCcw, Send, X } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

const SYSTEM_PROMPT = `You are RITP BOT, an intelligent and friendly AI assistant for RITP Lohegaon Pune college. Engage users in a natural, conversational manner while providing accurate information. Use a variety of greetings and response styles to seem more human-like. Always maintain a helpful and positive tone.


RESPONSE GUIDELINES:
1. Use natural language and vary your responses to sound more human-like.
2. Show empathy and enthusiasm in your responses.
3. Use conversational phrases like "Well," "You know," "Actually," to start sentences occasionally.
4. Ask follow-up questions to engage the user and gather more context.
5. If appropriate, share anecdotes or fun facts about college life at RITP.
6. Use emojis sparingly to convey emotion, but don't overdo it.

GREETING VARIATIONS:
- "Hey there! 👋 I'm RITP BOT, your friendly RITP Lohegaon guide. What can I help you with today?"
- "Welcome to RITP Lohegaon! I'm your AI assistant, ready to answer any questions you might have."
- "Greetings! 😊 I'm RITP BOT, here to help you navigate all things RITP Lohegaon. What would you like to know?"
COLLEGE INFORMATION:

About RITP:
- Full Name: Rajarambapu Institute of Technology Polytechnic (RITP)
- Location: Lohegaon, Pune, Maharashtra, India
- Approved By: AICTE, DTE Maharashtra
- Affiliated To: MSBTE (Maharashtra State Board of Technical Education)

Courses Offered:
1. Mechanical Engineering (3 years)
2. Artificial Intelligence and Machine Learning (3 years)
3. Civil Engineering (3 years)
4. Computer Engineering (3 years)

Last Year's Results:
- Overall pass percentage: 92%
- Mechanical Engineering: 90% pass rate
- AI/ML Engineering: 95% pass rate
- Civil Engineering: 88% pass rate
- Computer Engineering: 94% pass rate

Placements:
- 85% overall placement rate
- Top recruiters: TCS, Infosys, L&T, Godrej
- Highest package: ₹8 LPA
- Average package: ₹4.5 LPA

Student Awards:
- National level project competition winner in AI/ML category
- State-level paper presentation award in Mechanical Engineering
- Inter-college hackathon champions (Computer Engineering team)

College Awards:
- Best Emerging Polytechnic in Maharashtra (2022)
- Excellence in Industry-Academia Partnership Award
- Green Campus Initiative Recognition

Faculty Information:
- 50+ experienced faculty members
- 30% with Ph.D. qualifications
- Regular faculty development programs
- Industry experts as visiting faculty

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

5. When asked about results:
Present in this format:
📊 Last Year's Results:
• Overall pass percentage: [Percentage]
• [Course Name]: [Pass rate]
• [Course Name]: [Pass rate]
• ...

Then ask: "Would you like to know about the performance of a specific department?"

6. When asked about placements:
Present in this format:
💼 Placement Highlights:
• Overall placement rate: [Percentage]
• Top recruiters: [List companies]
• Highest package: [Amount]
• Average package: [Amount]

Then ask: "Would you like information about placements for a specific course?"

7. When asked about awards:
Separate student and college awards:
🏆 Student Awards:
• [List awards with brief descriptions]

🏅 College Awards:
• [List awards with brief descriptions]

Then ask: "Would you like more details about any specific award?"

8. When asked about faculty:
Present in this format:
👨‍🏫 Faculty Overview:
• Total faculty members: [Number]
• Ph.D. qualified: [Percentage]
• [Other key points]

Then ask: "Would you like to know about faculty in a particular department?"

LEARNING INSTRUCTIONS:
1. When presented with new information about the college, evaluate its relevance and potential accuracy.
2. If the information seems relevant and likely accurate, respond with: "Thank you for sharing that information. I'll make a note of it. Is there anything else you'd like to know about RITP?"
3. Do not immediately use newly learned information in responses. Wait for confirmation or repeated mentions.
4. If asked about something you're unsure of, say: "I don't have confirmed information about that. Would you like me to check with the college administration for you?"

IMPORTANT INSTRUCTIONS:
1. Always provide information in structured formats with bullet points and emojis
2. After every response, ask a relevant follow-up question
3. Keep responses concise but informative
4. Use a friendly, professional tone
5. If unsure about specific details, stick to confirmed information
6. Always maintain conversation flow by referencing previous questions
7. Focus solely on RITP Lohegaon Pune college-related information

Remember to be engaging and informative while providing accurate information about RITP Lohegaon Pune.`





interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  options?: Option[]
}

interface Option {
  label: string
  value: string
}

interface ChatbotProps {
  onClose?: () => void
}

const BotAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
)

const UserAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)

const questionKeywords = [
  'cutoff', 'admission', 'department', 'course', 'fee', 'placement',
  'faculty', 'infrastructure', 'hostel', 'scholarship', 'exam', 'events'
]

const splitQuestions = (input: string): string[] => {
  const sentences = input.split(/[.!?]+/).filter(Boolean).map(s => s.trim())
  return sentences.filter(sentence =>
    questionKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  )
}

const generateOptions = (userInput: string, botResponse: string): Option[] => {
  const options: Option[] = [];
  const lowercaseInput = userInput.toLowerCase();
  const lowercaseResponse = botResponse.toLowerCase();

  const allOptions = [
    { label: 'Course Details', value: 'Tell me more about the courses offered at RITP' },
    { label: 'Admission Process', value: 'What is the admission process for RITP?' },
    { label: 'Placement Statistics', value: 'What are the placement statistics for RITP?' },
    { label: 'Faculty Information', value: 'Tell me about the faculty at RITP' },
    { label: 'College Events', value: 'What are the upcoming events at RITP?' },
    { label: 'Infrastructure', value: 'Describe the infrastructure at RITP' },
    { label: 'Scholarships', value: 'Are there any scholarships available at RITP?' },
    { label: 'Extracurricular Activities', value: 'What extracurricular activities are offered at RITP?' },
    { label: 'Research Opportunities', value: 'Are there research opportunities for students at RITP?' },
    { label: 'Industry Partnerships', value: 'Does RITP have any industry partnerships?' }
  ];

  // Always include at least one related option if available
  const relatedOption = allOptions.find(option => 
    lowercaseInput.includes(option.label.toLowerCase()) && 
    !lowercaseResponse.includes(option.label.toLowerCase())
  );

  if (relatedOption) {
    options.push(relatedOption);
  }

  // Add random options to make up to 3 total options
  while (options.length < 3 && allOptions.length > options.length) {
    const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  return options;
};

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const greetings = [
    "Hi! 👋 I'm RITP BOT, and I'll be your guide to RITP Lohegaon today.",
    "Hello! Welcome to RITP Lohegaon. I'm your AI assistant, ready to help!",
    "Greetings! 😊 I'm here to help you learn about RITP Lohegaon. What would you like to know?",
    "Welcome to RITP Lohegaon! 🎓 I'm your virtual assistant, eager to answer your questions.",
    "Hey there! Ready to explore RITP Lohegaon? I'm here to guide you through everything you need to know.",
    "Good day! 🌟 I'm RITP BOT, your personal guide to all things RITP Lohegaon. What can I help you with?",
    "Hello and welcome to RITP Lohegaon! I'm your AI companion, ready to assist with any inquiries you might have."
  ]

  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    setMessages([
      {
        role: 'assistant',
        content: `${randomGreeting} Feel free to ask me multiple questions at once - I can handle it!`,
        timestamp: new Date()
      }
    ])
  }, [])

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const processUserInput = async (userInput: string) => {
    if (isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const questions = splitQuestions(userInput)
      let response: string

      if (questions.length > 1) {
        response = await generateGeminiResponse(
          `User has asked multiple questions: ${questions.join(', ')}. Please provide a structured response addressing each question separately.`,
          SYSTEM_PROMPT
        )
      } else {
        const conversationContext = messages
          .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .join('\n')

        response = await generateGeminiResponse(
          `${conversationContext}\n\nUser: ${userInput}\n\nA:`,
          SYSTEM_PROMPT
        )
      }

      if (response) {
        const newOptions = generateOptions(userInput, response)
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          options: newOptions
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
          content: "I apologize, I'm having trouble processing that right now. But don't worry, I can still help you with key information about RITP. What would you like to know about our courses, results, placements, or any other aspect of the college?",
          timestamp: new Date(),
          options: []
        }
      ])
    }

    setIsLoading(false)
  }

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    processUserInput(input)
  }, [input])

  const handleOptionClick = useCallback((option: Option) => {
    processUserInput(option.value)
  }, [])

  const formatMessageDate = (date: Date) => {
    return format(date, 'h:mm a')
  }

  const formatDateDivider = (date: Date) => {
    return format(date, 'MMMM d, yyyy')
  }

  const handleRefresh = () => {
    if (window.confirm("Are you sure you want to clear the chat? This action cannot be undone.")) {
      setMessages([
        {
          role: 'assistant',
          content: greetings[Math.floor(Math.random() * greetings.length)],
          timestamp: new Date()
        }
      ])
      setInput('')
      setIsLoading(false)
    }
  }


  return (
    <Card className="w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage src="/logorit.png" alt="RITP Logo" />
            <AvatarFallback className="bg-primary/10 text-primary">RT</AvatarFallback>
          </Avatar>
          <span className="font-semibold">RITP BOT</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleRefresh} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>


      <main className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="py-4 space-y-6">
            <div className="text-center">
              <div className="text-xs text-muted-foreground px-2 py-1 inline-block rounded-md bg-muted/50">
                {formatDateDivider(new Date())}
              </div>
            </div>

            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'bg-blue-500' : 'bg-white'}`}>
                    <AvatarFallback>
                      {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className={`rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-none'
                          : 'bg-white text-black rounded-tl-none'
                      }`}
                    >
                      {message.content}
                    </motion.div>
                    <div className={`text-xs text-muted-foreground ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatMessageDate(message.timestamp)}
                    </div>
                  </div>
                </div>
                {message.role === 'assistant' && message.options && message.options.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 justify-start mt-2"
                  >
                    {message.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        disabled={isLoading}
                        className="hover:bg-primary hover:text-primary-foreground transition-colors bg-background/60"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback><BotAvatar /></AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="rounded-2xl rounded-tl-none px-4 py-2 bg-secondary text-secondary-foreground">
                      <div className="flex space-x-2">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-current"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-current"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-current"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 bg-background border-t">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask your question... (Shift + Enter for new line)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="pr-12"
                aria-label="Chat input"
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </Card>
  )
}

// export default Chatbot;
