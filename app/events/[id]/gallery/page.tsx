import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { GalleryGrid } from "@/components/gallery-grid"

interface Event {
  id: string
  title: string
  date: string
  venue: string
  description: string
  image: string
  gallery: string[]
}

interface PageProps {
  params: {
    id: string
  }
}

// Mock database
const events: Event[] = [
  {
    id: "4",
    title: "Robotics Workshop",
    date: "2023-12-10",
    venue: "Robotics Lab",
    description: "Hands-on workshop on building and programming robots.",
    image: "/events/robotics-workshop.jpg",
    gallery: ["/events/robot1.jpeg", "/events/robot2.jpeg", "/events/robot3.jpeg"]
  }
]

export default function EventGalleryPage({ params }: PageProps) {
  const event = events.find(e => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">{event.title} Gallery</h1>
              <Button variant="outline" asChild>
                <Link href="/events">Back to Events</Link>
              </Button>
            </div>
            <GalleryGrid images={event.gallery} title={event.title} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }))
}

