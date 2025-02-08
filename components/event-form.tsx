"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function EventForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await fetch("/api/events", {
      method: "POST",
      body: formData,
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your event was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your event has been created.",
    })

    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Input type="text" name="title" placeholder="Event Title" required />
      <Input type="date" name="date" required />
      <Input type="time" name="time" required />
      <Input type="text" name="venue" placeholder="Venue" required />
      <Textarea name="description" placeholder="Event Description" required />
      <Input type="file" name="image" accept="image/*" required />
      <Input type="file" name="gallery" accept="image/*" multiple required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Event"}
      </Button>
    </form>
  )
}

