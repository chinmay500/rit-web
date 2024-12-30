import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  description: string
  image: string
  gallery: string[]
}

interface EventsListProps {
  events: Event[]
  type: "upcoming" | "past"
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <div className="relative h-48 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link href={`/events/${event.id}`}>View More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

