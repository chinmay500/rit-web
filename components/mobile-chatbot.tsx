import React from "react"
import { Message, Option } from "./Chatbot"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, Sparkles, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
    <Card className="w-full h-[calc(100vh-2rem)] mx-auto shadow-lg border-primary/10 flex flex-col">
      <CardHeader className="border-b bg-muted/50 p-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
            <AvatarImage src="/logo.png" alt="RITP Bot" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <BotAvatar />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base flex items-center gap-1">
              RITP Bot
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs font-normal">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full p-3" ref={scrollAreaRef}>
          <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", {
                  "justify-end": message.role === "user",
                  "justify-start": message.role === "assistant",
                })}
              >
                <div
                  className={cn("flex gap-2 max-w-[85%]", {
                    "flex-row-reverse": message.role === "user",
                  })}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Avatar
                      className={cn("h-7 w-7", {
                        "bg-primary text-primary-foreground": message.role === "assistant",
                        "bg-muted": message.role === "user",
                      })}
                    >
                      {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={cn("rounded-lg p-2.5", {
                        "bg-primary text-primary-foreground": message.role === "user",
                        "bg-muted": message.role === "assistant",
                      })}
                    >
                      <div
                        className="prose prose-sm dark:prose-invert text-sm"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>')
                            .replace(/\n/g, "<br />"),
                        }}
                      />
                      {message.imageUrl && (
                        <img
                          src={message.imageUrl || "/placeholder.svg"}
                          alt="Response image"
                          className="mt-2 rounded-md max-w-full h-auto"
                        />
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">
                      {format(new Date(message.timestamp), "h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <Avatar className="h-7 w-7 bg-primary text-primary-foreground">
                    <BotAvatar />
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div className="bg-muted rounded-lg p-2.5">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {options.length > 0 && !isLoading && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  Suggested Questions <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[40vh]">
                <div className="flex flex-col gap-2 py-2">
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start text-left h-auto py-3 hover:bg-primary/10 hover:text-primary"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t bg-muted/30 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/50 text-sm"
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
