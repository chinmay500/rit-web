"use client"
import { useState, useEffect, useRef } from "react"
import { generateGeminiResponse } from "@/lib/gemini"
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
7. ONLY answer questions related to RITP Lohegaon Pune college. If a question is not related to the college, politely inform the user that you can only provide information about RITP Lohegaon Pune.
8. DO NOT provide any code or answer coding-related questions, even if they seem to be related to courses offered at the college. Instead, explain that you can provide information about the college's computer science or programming courses, but cannot write or explain specific code.
9. Do not provide any general knowledge questions or any political affair information, even if they seem to be related. Instead, suggest that the user check the latest news on news platforms.
10. If the user asks about topics outside the scope of RITP Lohegaon Pune, respond with: "I'm here to provide information about RITP Lohegaon Pune. If you have any questions about the college, feel free to ask!"
11. Do not engage in discussions about other educational institutions, universities, or colleges. Always redirect the conversation back to RITP Lohegaon Pune.
12. If the user asks for personal advice, opinions, or subjective matters, respond with: "I'm here to provide factual information about RITP Lohegaon Pune. For personal advice, you might want to consult with a counselor or advisor."
13. Do not provide any financial, legal, or medical advice. If asked, respond with: "I'm not qualified to provide financial, legal, or medical advice. Please consult a professional in that field."
14. If the user asks about the chatbot's capabilities or how it works, respond with: "I'm an AI assistant designed to provide information about RITP Lohegaon Pune. How can I assist you with college-related questions?"
15. Do not engage in any form of debate or argument. If the user becomes confrontational, respond with: "I'm here to help with any questions you have about RITP Lohegaon Pune. Let me know how I can assist you!"
16. STRICTLY DO NOT PROVIDE ANY PROGRAMMING LANGUAGE CODE, EXAMPLES, OR IMPLEMENTATION DETAILS. If the user asks for code, respond with: "I'm here to provide information about RITP Lohegaon Pune. I cannot provide or explain programming code. However, I can tell you about our computer science or programming-related courses if you're interested!"
17. Do not explain algorithms, data structures, or technical concepts in detail. If asked, respond with: "I can provide information about our computer science curriculum, but I cannot explain technical concepts or algorithms in detail."
18. Do not assist with debugging, code optimization, or software development. If asked, respond with: "I'm here to provide information about RITP Lohegaon Pune. For coding assistance, you might want to consult with a programming tutor or use online coding resources."
19. Do not provide examples of code snippets, pseudocode, or programming logic. If asked, respond with: "I cannot provide code examples, but I can share information about our programming courses and how they prepare students for careers in software development."
20. Do not engage in discussions about specific programming languages (e.g., Python, Java, C++). If asked, respond with: "I can provide information about the programming languages taught in our courses, but I cannot provide code or technical details about them."

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

Remember to be engaging and informative while providing accurate information about RITP Lohegaon Pune. Do not provide any code, programming solutions, or technical implementation details, even if asked. Always redirect the conversation back to RITP Lohegaon Pune if it drifts off-topic.`

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
  }, [])

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
