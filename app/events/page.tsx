import { Footer } from "@/components/footer"
import { EventsList } from "@/components/events-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  description: string
  image: string
  gallery: string[]
}

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Annual Technical Symposium",
    date: "2024-02-15",
    time: "09:00 AM",
    venue: "Main Auditorium",
    description: "Join us for a day of technical presentations, workshops, and competitions.",
    image: "/events/tech-symposium.jpg",
    gallery: ["/events/tech-symposium-1.jpg", "/events/tech-symposium-2.jpg", "/events/tech-symposium-3.jpg"]
  },
  {
    id: "2",
    title: "Industry Expert Talk Series",
    date: "2024-02-20",
    time: "02:00 PM",
    venue: "Seminar Hall",
    description: "Distinguished speakers from leading tech companies share their insights.",
    image: "/events/expert-talk.jpg",
    gallery: ["/events/expert-talk-1.jpg", "/events/expert-talk-2.jpg", "/events/expert-talk-3.jpg"]
  },
  {
    id: "3",
    title: "Cultural Fest 2024",
    date: "2024-03-05",
    time: "10:00 AM",
    venue: "College Ground",
    description: "Annual cultural festival featuring music, dance, and various competitions.",
    image: "/events/cultural-fest.jpg",
    gallery: ["/events/cultural-fest-1.jpg", "/events/cultural-fest-2.jpg", "/events/cultural-fest-3.jpg"]
  }
]

export const pastEvents: Event[] = [
  {
    id: "4",
    title: "RIT students in Dipex",
    date: "2024-03-07",
    time: "10:00 AM",
    venue: "Mumbai",
    description: "AIML students participated in Dipex 2024 at Mumbai.",
    image: "/ev1.jpeg",
    gallery: ["/events/robot1.jpeg", "/events/robot2.jpeg", "/events/robot3.jpeg"]
  },
  {
    id: "5",
    title: "Alumni Meet 2023",
    date: "2023-11-25",
    time: "05:00 PM",
    venue: "College Campus",
    description: "Annual gathering of college alumni sharing their experiences and success stories.",
    image: "/events/alumni-meet.jpg",
    gallery: ["/events/alumni1.jpg", "/events/alumni2.jpg", "/events/alumni3.jpg"]
  },
  {
    id: "6",
    title: "National Conference on Emerging Technologies",
    date: "2023-10-15",
    time: "09:00 AM",
    venue: "Conference Hall",
    description: "Research presentations and discussions on emerging technologies.",
    image: "/events/conference.jpg",
    gallery: ["/events/conf1.jpg", "/events/conf2.jpg", "/events/conf3.jpg"]
  }
]

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
   
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <h1 className="text-4xl font-bold text-center mb-8">College Events</h1>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <EventsList events={upcomingEvents} type="upcoming" />
              </TabsContent>
              <TabsContent value="past">
                <EventsList events={pastEvents} type="past" />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

