"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

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

// Updated SYSTEM_PROMPT (concise and clear)
const SYSTEM_PROMPT = `You are RITP BOT, an AI assistant for RITP Lohegaon Pune polytechnic college. Follow these guidelines:

1. **Be Helpful and Accurate**: Provide factual information about RITP Lohegaon Pune.
2. **Stay On-Topic**: Only answer questions related to the college. For unrelated queries, respond: "I can only provide information about RITP Lohegaon Pune."
3. **No Code or Technical Details**: Do not provide code, algorithms, or technical implementation details. Redirect to course information if asked.
4. **Engaging Responses**: Use natural language, emojis sparingly, and conversational phrases.
5. **Structured Format**: Use bullet points (•), numbered emojis (1️⃣, 2️⃣), and bold text (**) for clarity.

**College Departments**:
1. CO - Computer Engineering
2. AIML - Artificial Intelligence and Machine Learning
3. Civil - Civil Engineering
4. Mechanical - Mechanical Engineering

**Response Format**:
1️⃣ **Section Title:**
• Key point 1
• Key point 2
→ Outcome or result

Let me know how I can assist you! 😊`;

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
    "Hi! 👋 I'm RITP BOT, your guide to RITP Lohegaon Pune.",
    "Hello! Welcome to RITP Lohegaon. How can I assist you today?",
    "Greetings! 😊 What would you like to know about RITP Lohegaon?",
  ]

  // Initial greeting
  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    setMessages([
      {
        role: "assistant",
        content: randomGreeting,
        timestamp: new Date(),
      },
    ])
  }, [])

  // Auto-scroll to the latest message
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
    const options: Option[] = [];
    const lowercaseInput = userInput.toLowerCase();
    // const lowercaseResponse = botResponse.toLowerCase();

    const allOptions = [
      { label: "Course Details", value: "Tell me more about the courses offered" },
      { label: "Admission Process", value: "What is the admission process?" },
      { label: "Placement Statistics", value: "What are the placement statistics?" },
      { label: "Faculty Information", value: "Tell me about the faculty" },
      { label: "College Events", value: "What are the upcoming college events?" },
      { label: "Infrastructure", value: "Describe the college infrastructure" },
      { label: "Scholarships", value: "Are there any scholarships available?" },
      { label: "Extracurricular Activities", value: "What extracurricular activities are offered?" },
      { label: "Computer Department", value: "Tell me about the Computer department" },
      { label: "AIML Department", value: "Tell me about the Artificial Intelligence and Machine Learning department" },
      { label: "Civil Department", value: "Tell me about the Civil Engineering department" },
      { label: "Mechanical Department", value: "Tell me about the Mechanical Engineering department" },
      { label: "College History", value: "What is the history of RITP Lohegaon?" },
      { label: "Campus Facilities", value: "What facilities are available on campus?" },
      { label: "Hostel Accommodation", value: "Tell me about hostel facilities" },
      { label: "Sports Facilities", value: "What sports facilities are available?" },
    ];

    // Filter out already asked questions
    const availableOptions = allOptions.filter((option) => !askedQuestions.has(option.value));

    // Prioritize options based on user input
    const isDepartmentQuery = lowercaseInput.includes("department") || lowercaseInput.includes("dept");
    const isCourseQuery = lowercaseInput.includes("course") || lowercaseInput.includes("program");
    const isCollegeQuery = lowercaseInput.includes("college") || lowercaseInput.includes("rit") || lowercaseInput.includes("ritp");
    const isAIMLQuery = lowercaseInput.includes("aiml") || lowercaseInput.includes("ai") || lowercaseInput.includes("ml");

    let priorityOptions: Option[] = [];

    if (isAIMLQuery) {
      priorityOptions = availableOptions.filter(
        (option) => option.label.toLowerCase().includes("aiml") || option.value.toLowerCase().includes("artificial intelligence")
      );
    } else if (isDepartmentQuery) {
      priorityOptions = availableOptions.filter(
        (option) => option.label.toLowerCase().includes("department") || option.value.toLowerCase().includes("department")
      );
    } else if (isCourseQuery) {
      priorityOptions = availableOptions.filter(
        (option) => option.label.toLowerCase().includes("course") || option.value.toLowerCase().includes("course")
      );
    } else if (isCollegeQuery) {
      priorityOptions = availableOptions.filter(
        (option) => option.label.toLowerCase().includes("college") || option.value.toLowerCase().includes("college")
      );
    }

    // Add up to 2 priority options
    for (let i = 0; i < Math.min(2, priorityOptions.length); i++) {
      options.push(priorityOptions[i]);
    }

    // Add random options to make up to 3 total options
    while (options.length < 3 && availableOptions.length > options.length) {
      const randomOption = availableOptions[Math.floor(Math.random() * availableOptions.length)];
      if (!options.some((opt) => opt.value === randomOption.value)) {
        options.push(randomOption);
      }
    }

    return options;
  };

  // Process user input
  const processUserInput = async (userInput: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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
      });

      if (response) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Generate follow-up options
        const newOptions = generateOptions(userInput, response, askedQuestions);
        setOptions(newOptions);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processUserInput(input);
  };

  // Handle option click
  const handleOptionClick = (option: Option) => {
    setAskedQuestions((prev) => new Set(prev).add(option.value));
    processUserInput(option.value);
  };

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
  );
}