'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateGeminiResponse, addToDynamicKnowledge, DynamicKnowledge } from '@/lib/gemini'

const SYSTEM_PROMPT = `You are RITP BOT, an intelligent AI assistant for RITP Lohegaon Pune college. You must provide information in a structured, easy-to-read format and ALWAYS ask relevant follow-up questions to engage users. You can learn new information about the college, but you must verify its relevance and accuracy before incorporating it.

COLLEGE INFORMATION:

About RITP:
- Full Name: Rajgad Institute of Technology Polytechnic (RITP)
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
        content: "👋 Hello! I'm RITP BOT, your intelligent RITP Lohegaon Pune assistant. I can help you with:\n\n📚 Courses and Programs\n🏫 Campus Facilities\n📝 Admission Process\n🎓 Career Opportunities\n📊 Results and Placements\n🏆 Awards and Achievements\n👨‍🏫 Faculty Information\n\nWhat would you like to know about?"
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

      const response = await generateGeminiResponse(
        `${conversationContext}\n\nUser: ${input}\n\nAssistant:`,
        SYSTEM_PROMPT
      )
      
      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        }
        setMessages(prev => [...prev, assistantMessage])

        // Check if the user provided new information
        if (input.toLowerCase().includes('did you know') || input.toLowerCase().includes('new information')) {
          // Determine the category based on the content
          const categoryKeywords: Record<keyof DynamicKnowledge, string[]> = {
            results: ['result', 'pass', 'percentage', 'score'],
            placements: ['placement', 'job', 'recruit', 'package', 'salary'],
            studentAwards: ['student award', 'student achievement', 'competition win'],
            collegeAwards: ['college award', 'institution award', 'recognition'],
            facultyInfo: ['faculty', 'professor', 'teacher', 'staff'],
            generalInfo: []
          };

          const categories: (keyof DynamicKnowledge)[] = [];
          
          Object.entries(categoryKeywords).forEach(([category, keywords]) => {
            if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
              categories.push(category as keyof DynamicKnowledge);
            }
          });

          // If no specific category is found, use 'generalInfo'
          if (categories.length === 0) {
            categories.push('generalInfo');
          }

          // Add the information to all relevant categories
          categories.forEach(category => {
            addToDynamicKnowledge(category, input);
          });

          // Acknowledge the new information
          const acknowledgmentMessage: Message = {
            role: 'assistant',
            content: `Thank you for sharing that information about ${categories.join(' and ')}. I've made a note of it. Is there anything else you'd like to know about RITP?`
          };
          setMessages(prev => [...prev, acknowledgmentMessage]);
        }
      } else {
        throw new Error('No response received')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize for the inconvenience. Let me help you with some key information about RITP:\n\n📚 Courses Offered:\n• Mechanical Engineering\n• AI/ML Engineering\n• Civil Engineering\n• Computer Engineering\n\n📊 Last Year's Overall Pass Rate: 92%\n💼 Placement Rate: 85%\n\nWhat specific aspect of RITP would you like to know more about?"
        }
      ])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with RITP BOT</h2>
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
            aria-label="Chat input"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

