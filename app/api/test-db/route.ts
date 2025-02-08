import { prisma } from "@/lib/prisma"
import { MongoClient } from "mongodb"

async function main() {
  try {
    console.log("Attempting to connect to the database...")
    await prisma.$connect()
    console.log("Successfully connected to the database")

    console.log("Database URL:", process.env.DATABASE_URL)
    console.log("MongoDB Database Name:", process.env.MONGODB_DB)

    // Test a simple query
    const userCount = await prisma.user.count()
    console.log(`Number of users in the database: ${userCount}`)

    // List all collections in the database using MongoClient
    const mongoClient = new MongoClient(process.env.DATABASE_URL || "")
    await mongoClient.connect()
    const db = mongoClient.db(process.env.MONGODB_DB)
    const collections = await db.listCollections().toArray()
    console.log(
      "Collections in the database:",
      collections.map((col) => col.name),
    )

    await mongoClient.close()
  } catch (error) {
    console.error("Failed to connect to the database:", error)
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()

