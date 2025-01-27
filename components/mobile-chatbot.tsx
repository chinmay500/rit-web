import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import type { Message, Option } from "./Chatbot"

interface MobileChatbotProps {
  messages: Message[]
  input: string
  setInput: (input: string) => void
  isLoading: boolean
  options: Option[]
  handleSubmit: (e: React.FormEvent) => void
  handleOptionClick: (option: Option) => void
  BotAvatar: React.FC
  UserAvatar: React.FC
  scrollAreaRef: React.RefObject<HTMLDivElement>
}

export function MobileChatbot({
  messages,
  input,
  setInput,
  isLoading,
  options,
  handleSubmit,
  handleOptionClick,
  BotAvatar,
  UserAvatar,
  scrollAreaRef,
}: MobileChatbotProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Chat Container */}
      <Card className="flex flex-col h-full overflow-hidden bg-white/80 dark:bg-gray-850/80 backdrop-blur-lg">
        <ScrollArea className="flex-grow px-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="py-4 space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-blue-500" : "bg-green-500"}`}>
                    <AvatarFallback>{message.role === "user" ? <UserAvatar /> : <BotAvatar />}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: message.content.replace(
                              /\*\*(.*?)\*\*/g,
                              '<span class="font-bold text-primary">$1</span>',
                            ),
                          }}
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={message.imageUrl || "/placeholder.svg"}
                          alt="College Image"
                          width={500}
                          height={300}
                          className="rounded-lg"
                          style={{
                            objectFit: "cover",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    )}
                    <div className={`text-xs text-gray-500 ${message.role === "user" ? "text-right" : "text-left"}`}>
                      {format(message.timestamp, "h:mm a")}
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
                  <Avatar className="h-8 w-8 bg-green-500">
                    <AvatarFallback>
                      <BotAvatar />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl rounded-tl-none px-4 py-2 bg-gray-100 dark:bg-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-white/80 dark:bg-gray-850/80 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-grow rounded-full bg-gray-100 dark:bg-gray-700"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full px-6 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

