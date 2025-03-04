import { db } from "@/db"
import { todos } from "@/db/schema"

async function seed() {
  try {
    console.log("Seeding database...")

    // Clear existing data
    await db.delete(todos)

    // Insert sample todos
    await db.insert(todos).values([
      { title: "Learn Next.js 15", completed: true },
      { title: "Set up MySQL database", completed: true },
      { title: "Implement Drizzle ORM", completed: false },
      { title: "Build Todo UI", completed: false },
      { title: "Deploy to Vercel", completed: false },
    ])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    process.exit(0)
  }
}

seed()

