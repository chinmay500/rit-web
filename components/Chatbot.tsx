"use client"
import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { generateGeminiResponse } from "@/lib/gemini"
// import { Send, ArrowLeftIcon } from "lucide-react"
// import { format } from "date-fns"
// import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import { DesktopChatbot } from "./desktop-chatbot"
import { MobileChatbot } from "./mobile-chatbot"

// Import data
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

// System prompt
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

// Message and Option interfaces
export interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  imageUrl?: string
}

export interface Option {
  label: string
  value: string
}

// Avatar components
const BotAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

// Chatbot component
export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set())
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  // const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Greeting messages
  const greetings = [
    "Hi! 👋 I'm RITP BOT, and I'll be your guide to RITP Lohegaon today.",
    "Hello! Welcome to RITP Lohegaon. I'm your AI assistant, ready to help!",
    "Greetings! 😊 I'm here to help you learn about RITP Lohegaon. What would you like to know?",
    "Welcome to RITP Lohegaon! 🎓 I'm your virtual assistant, eager to answer your questions.",
    "Hey there! Ready to explore RITP Lohegaon? I'm here to guide you through everything you need to know.",
    "Good day! 🌟 I'm RITP BOT, your personal guide to all things RITP Lohegaon. What can I help you with?",
    "Hello and welcome to RITP Lohegaon! I'm your AI companion, ready to assist with any inquiries you might have.",
  ]

  // Initial greeting
  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    setMessages([
      {
        role: "assistant",
        content: `${randomGreeting} Feel free to ask me multiple questions at once - I can handle it!`,
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const scrollContainer = scrollArea.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Generate follow-up options
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

  // Process user input
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
      const response = await generateGeminiResponse(userInput, {
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

      if (response) {
        // Extract image URL from the response (if any)
        const imageUrlMatch = response.match(/!\[Image\]$$(.*?)$$/)
        const imageUrl = imageUrlMatch ? imageUrlMatch[1] : undefined
        const content = response.replace(/!\[Image\]$$.*?$$/, "") // Remove the image URL from the content

        const assistantMessage: Message = {
          role: "assistant",
          content,
          timestamp: new Date(),
          imageUrl,
        }
        setMessages((prev) => [...prev, assistantMessage])

        // Generate follow-up options
        const newOptions = generateOptions(userInput, content, askedQuestions)
        setOptions(newOptions)
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ])
    }

    setIsLoading(false)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    processUserInput(input)
  }

  // Handle option click
  const handleOptionClick = (option: Option) => {
    setAskedQuestions((prev) => new Set(prev).add(option.value))
    processUserInput(option.value)
  }

  return (
    <>
      {isMobile ? (
        <MobileChatbot
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          options={options}
          handleSubmit={handleSubmit}
          handleOptionClick={handleOptionClick}
          BotAvatar={BotAvatar}
          UserAvatar={UserAvatar}
          scrollAreaRef={scrollAreaRef}
        />
      ) : (
        <DesktopChatbot
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          options={options}
          handleSubmit={handleSubmit}
          handleOptionClick={handleOptionClick}
          BotAvatar={BotAvatar}
          UserAvatar={UserAvatar}
          scrollAreaRef={scrollAreaRef}
        />
      )}
    </>
  )
}

