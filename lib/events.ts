import prisma from "./prisma"

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "desc",
      },
    })
    return events
  } catch (error) {
    console.error("Failed to fetch events:", error)
    return []
  }
}

