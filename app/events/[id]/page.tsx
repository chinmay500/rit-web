import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { CalendarIcon, Clock, MapPin } from 'lucide-react'
import { upcomingEvents, pastEvents} from "@/app/events/page"

interface PageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: PageProps) {
  const allEvents = [...upcomingEvents, ...pastEvents]
  const event = allEvents.find(e => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                <p className="text-lg mb-8">{event.description}</p>
                <Button asChild>
                  <Link href="/events">Back to Events</Link>
                </Button>
              </div>
              <div className="md:w-1/3">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={image}
                      alt={`${event.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  const allEvents = [...upcomingEvents, ...pastEvents]
  return allEvents.map((event) => ({
    id: event.id,
  }))
}

