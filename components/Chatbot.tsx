"use client"
import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { generateGeminiResponse } from "@/lib/gemini"
import { Send } from "lucide-react"
import { format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"

function debounce<T extends unknown[], R>(func: (...args: T) => R, wait: number): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: T) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

import { facultyData } from "@/data/faculty"
import { academicsData } from "@/data/academics"
import { labsData } from "@/data/labs"
import { facilitiesData } from "@/data/facilities"
import { achievementsData } from "@/data/achivement"
import { placementsData } from "@/data/palcements"
import { studentAwardsData } from "@/data/studentAwards"
import { generalInformationData } from "@/data/generalInformation"
import { admissionInfoData } from "@/data/admissionInfo"
import { partnershipsData } from "@/data/partnerships"
import Link from "next/link"

const SYSTEM_PROMPT = `You are RITP BOT, an intelligent and friendly AI assistant for RITP Lohegaon Pune college. Engage users in a natural, conversational manner while providing accurate information. Use a variety of greetings and response styles to seem more human-like. Always maintain a helpful and positive tone.

RESPONSE GUIDELINES:
1. Use natural language and vary your responses to sound more human-like.
2. Show empathy and enthusiasm in your responses.
3. Use conversational phrases like "Well," "You know," "Actually," to start sentences occasionally.
4. Ask follow-up questions to engage the user and gather more context.
5. If appropriate, share anecdotes or fun facts about college life at RITP.
6. Use emojis sparingly to convey emotion, but don't overdo it.

COLLEGE INFORMATION:
Use the imported data (facultyData, academicsData, labsData, facilitiesData, achievementsData, placementsData, studentAwardsData, generalInformationData, admissionInfoData, partnershipsData) to provide accurate and up-to-date information about the college.

RESPONSE FORMATTING:
When describing courses or programs:
1. Use "**" for course names (will be styled as bold and primary color)
2. Use numbered emojis (1️⃣, 2️⃣, etc.) for list items
3. Structure responses with clear sections
4. Add brief descriptions for each course
5. Include key highlights in separate lines
6. End each course section with career prospects

Example format:
1️⃣ **Course Name:**
• Key features and duration
• Main subjects covered
→ Career prospects

RESPONSE FORMATS:
[Keep the existing response formats]

LEARNING INSTRUCTIONS:
[Keep the existing learning instructions]

IMPORTANT INSTRUCTIONS:
[Keep the existing important instructions]

Remember to be engaging and informative while providing accurate information about RITP Lohegaon Pune.`

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Option {
  label: string
  value: string
}

const BotAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-bot"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
)

const UserAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const questionKeywords = [
  "cutoff",
  "admission",
  "department",
  "course",
  "fee",
  "placement",
  "faculty",
  "infrastructure",
  "hostel",
  "scholarship",
  "exam",
  "events",
]

const splitQuestions = (input: string): string[] => {
  const sentences = input
    .split(/[.!?]+/)
    .filter(Boolean)
    .map((s) => s.trim())
  return sentences.filter((sentence) => questionKeywords.some((keyword) => sentence.toLowerCase().includes(keyword)))
}

const generateOptions = (userInput: string, botResponse: string, askedQuestions: Set<string>): Option[] => {
  const options: Option[] = []
  const lowercaseInput = userInput.toLowerCase()
  const lowercaseResponse = botResponse.toLowerCase()

  const allOptions = [
    { label: "Course Details", value: "Tell me more about the courses offered" },
    { label: "Admission Process", value: "What is the admission process?" },
    { label: "Placement Statistics", value: "What are the placement statistics?" },
    { label: "Faculty Information", value: "Tell me about the faculty" },
    { label: "College Events", value: "What are the upcoming college events?" },
    { label: "Infrastructure", value: "Describe the college infrastructure" },
    { label: "Scholarships", value: "Are there any scholarships available?" },
    { label: "Extracurricular Activities", value: "What extracurricular activities are offered?" },
    { label: "Research Opportunities", value: "Are there research opportunities for students?" },
    { label: "Industry Partnerships", value: "Does the college have any industry partnerships?" },
  ]

  // Filter out already asked questions
  const availableOptions = allOptions.filter((option) => !askedQuestions.has(option.value))

  // Always include at least one related option if available
  const relatedOption = availableOptions.find(
    (option) =>
      lowercaseInput.includes(option.label.toLowerCase()) && !lowercaseResponse.includes(option.label.toLowerCase()),
  )

  if (relatedOption) {
    options.push(relatedOption)
  }

  // Add random options to make up to 3 total options
  while (options.length < 3 && availableOptions.length > options.length) {
    const randomOption = availableOptions[Math.floor(Math.random() * availableOptions.length)]
    if (!options.includes(randomOption)) {
      options.push(randomOption)
    }
  }

  return options
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set())
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true)
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
    "Hello and welcome to RITP Lohegaon! I'm your AI companion, ready to assist with any inquiries you might have.",
  ]

  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    setMessages([
      {
        role: "assistant",
        content: `${randomGreeting} Feel free to ask me multiple questions at once - I can handle it!`,
        timestamp: new Date(),
      },
    ])

    const handleResize = () => {
      const visualViewport = window?.visualViewport
      if (!visualViewport) return

      const isKeyboardVisible = visualViewport.height < window.innerHeight
      setIsKeyboardVisible(isKeyboardVisible)

      if (isKeyboardVisible && inputRef.current) {
        window.scrollTo({
          top: visualViewport.offsetTop + visualViewport.height,
          behavior: "smooth",
        })
      }
    }

    window.visualViewport?.addEventListener("resize", handleResize)
    window.visualViewport?.addEventListener("scroll", handleResize)

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize)
      window.visualViewport?.removeEventListener("scroll", handleResize)
    }
  }, [])

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (isKeyboardVisible && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [isKeyboardVisible])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      const isScrollable = scrollArea.scrollHeight > scrollArea.clientHeight
      scrollArea.style.overflowY = isScrollable ? "auto" : "hidden"
    }
  }, [messages])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant") {
        const memoizedOptions = generateOptions(
          messages[messages.length - 2]?.content || "",
          lastMessage.content,
          askedQuestions,
        )
        setOptions(memoizedOptions)
      }
    }
  }, [messages, askedQuestions])

  const processUserInput = async (userInput: string) => {
    if (isLoading) return

    const userMessage: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const questions = splitQuestions(userInput)
      let response: string

      if (questions.length > 1) {
        response = await generateGeminiResponse(
          `User has asked multiple questions: ${questions.join(", ")}. Please provide a structured response addressing each question separately.`,
          {
            systemPrompt: SYSTEM_PROMPT,
            data: {
              facultyData,
              academicsData,
              labsData,
              facilitiesData,
              achievementsData,
              placementsData,
              studentAwardsData,
              generalInformationData,
              admissionInfoData,
              partnershipsData,
            },
          },
        )
      } else {
        const conversationContext = messages
          .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
          .join("\n")

        response = await generateGeminiResponse(`${conversationContext}\n\nUser: ${userInput}\n\nAssistant:`, {
          systemPrompt: SYSTEM_PROMPT,
          data: {
            facultyData,
            academicsData,
            labsData,
            facilitiesData,
            achievementsData,
            placementsData,
            studentAwardsData,
            generalInformationData,
            admissionInfoData,
            partnershipsData,
          },
        })
      }

      if (response && response.includes("**")) {
        // Format course information with better styling
        response = response
          .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>')
          .replace(
            /(\d️⃣)/g,
            '<span class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-primary rounded-full mr-2">$1</span>',
          )
          .split("\n")
          .map((line) => `<div class="mb-4">${line}</div>`)
          .join("")
      }

      if (response) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error("No response received")
      }
    } catch (error) {
      console.error("Error:", error)
      if (userInput.toLowerCase().includes("partnership")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I apologize for the inconvenience. We're having trouble accessing our partnership data at the moment. However, I can confirm that RITP has several industry partnerships, particularly in the Mechanical Engineering department. These include collaborations with automotive and manufacturing companies. Would you like me to provide general information about our academic programs instead?",
            timestamp: new Date(),
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I apologize, I'm having trouble processing that right now. But don't worry, I can still help you with key information about RITP. What would you like to know about our courses, results, placements, or any other aspect of the college?",
            timestamp: new Date(),
          },
        ])
      }
    }

    setIsLoading(false)
  }

  const debouncedHandleInputChange = useCallback(
    debounce((value: string) => {
      setInput(value)
    }, 100),
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return
      processUserInput(input)
    },
    [input],
  )

  const handleOptionClick = useCallback((option: Option) => {
    setAskedQuestions((prev) => new Set(prev).add(option.value))
    processUserInput(option.value)
    setIsMobileHeaderVisible(false)
  }, [])

  const formatMessageDate = (date: Date) => {
    return format(date, "h:mm a")
  }

  const formatDateDivider = (date: Date) => {
    return format(date, "MMMM d, yyyy")
  }

  

  const processedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        formattedTime: formatMessageDate(message.timestamp),
      })),
    [messages],
  )

  return (
    <div className={`flex flex-col h-screen ${isMobileHeaderVisible ? "pt-16" : "pt-0"} md:pt-20`}>
      
      
      <Card className="w-full max-w-[600px] mx-auto flex-grow flex flex-col rounded-2xl shadow-lg overflow-hidden mt-2 md:mt-4 md:overflow-visible">
        <ScrollArea
          className={`flex-grow px-4 overflow-y-auto pt-8 md:pt-2 ${isKeyboardVisible ? "pb-[120px]" : ""}`}
          ref={scrollAreaRef}
        >
          <div className="py-4 space-y-6 min-h-full">
            <div className="text-center">
            <Link href="/" className='flex items-start gap-3'>
          <Button variant="ghost" className="bg-black text-slate-50">
            ← Back
          </Button>
        </Link>
              <div className="text-xs text-muted-foreground px-2 py-1 inline-block rounded-md bg-muted">
                
                {formatDateDivider(new Date())}
              </div>
              
            </div>
            {processedMessages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-primary" : "bg-secondary"}`}>
                    <AvatarFallback>{message.role === "user" ? <UserAvatar /> : <BotAvatar />}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 [&_p]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-primary [&_.course-section]:border-l-4 [&_.course-section]:border-primary [&_.course-section]:pl-4 [&_.course-section]:my-4">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                    <div
                      className={`text-xs text-muted-foreground ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      {message.formattedTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {options.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    disabled={isLoading}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback>
                      <BotAvatar />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="rounded-2xl rounded-tl-none px-4 py-2 bg-muted">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div
          className={`p-4 border-t ${isKeyboardVisible ? "fixed bottom-0 left-0 right-0 bg-background z-50 pb-safe" : ""} w-full max-w-[600px] mx-auto`}
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => debouncedHandleInputChange(e.target.value)}
              disabled={isLoading}
              className="flex-grow rounded-full"
              aria-label="Chat input"
              ref={inputRef}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90"
            > 
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
            
          </form>
          <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 md:hidden z-50"
        onClick={() => window.history.back()}
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </Button>
        </div>
      </Card>
      
    </div>
  )
}

