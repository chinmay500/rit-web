import React from "react"
import { Message, Option } from "./Chatbot"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface DesktopChatbotProps {
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

export function DesktopChatbot({
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
}: DesktopChatbotProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-primary/10 bg-gradient-to-b from-background to-background/80 backdrop-blur">
      <CardHeader className="border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
            <AvatarImage src="/logo.png" alt="RITP Bot" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <BotAvatar />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              RITP Bot
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs font-normal">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Assistant
              </Badge>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", {
                  "justify-end": message.role === "user",
                  "justify-start": message.role === "assistant",
                })}
              >
                <div
                  className={cn("flex gap-2 max-w-[80%]", {
                    "flex-row-reverse": message.role === "user",
                  })}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Avatar
                      className={cn("h-8 w-8", {
                        "bg-primary text-primary-foreground": message.role === "assistant",
                        "bg-muted": message.role === "user",
                      })}
                    >
                      {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={cn("rounded-lg p-3", {
                        "bg-primary text-primary-foreground": message.role === "user",
                        "bg-muted": message.role === "assistant",
                      })}
                    >
                      <div
                        className="prose prose-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>')
                            .replace(/\n/g, "<br />"),
                        }}
                      />
                      {message.imageUrl && (
                        <Image
                          src={message.imageUrl || "/placeholder.svg"}
                          alt="Response image"
                          className="mt-2 rounded-md max-w-full h-auto"
                        />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground px-2">
                      {format(new Date(message.timestamp), "h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                    <BotAvatar />
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {options.length > 0 && !isLoading && (
            <div className="flex flex-wrap gap-2 mt-4">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-muted/30">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/50"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
