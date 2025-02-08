"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import type React from "react"

interface Event {
  id: string
  title: string
  description: string
  date: string
}

export default function DashboardClient() {
  const { data: session, status } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" })

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents()
    }
  }, [status])

  const fetchEvents = async () => {
    const res = await fetch("/api/events")
    const data = await res.json()
    if (data.success) {
      setEvents(data.data)
    } else {
      toast.error("Failed to fetch events")
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
    const data = await res.json()
    if (data.success) {
      toast.success("Event created successfully")
      setNewEvent({ title: "", description: "", date: "" })
      fetchEvents()
    } else {
      toast.error("Failed to create event")
    }
  }

  const handleDeleteEvent = async (id: string) => {
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
    const data = await res.json()
    if (data.success) {
      toast.success("Event deleted successfully")
      fetchEvents()
    } else {
      toast.error("Failed to delete event")
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to access the dashboard.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {session?.user && (
        <>
          <form onSubmit={handleCreateEvent} className="mb-8">
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="mb-2 p-2 border rounded"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create Event
            </motion.button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border p-4 rounded"
              >
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p>{event.description}</p>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </div>
        </>
      )}
      <Toaster />
    </div>
  )
}

