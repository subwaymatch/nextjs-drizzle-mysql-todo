"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { todos, type NewTodo } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getTodos() {
  try {
    return await db.select().from(todos).orderBy(todos.createdAt)
  } catch (error) {
    console.error("Failed to fetch todos:", error)
    throw new Error("Failed to fetch todos")
  }
}

export async function addTodo(data: NewTodo) {
  try {
    await db.insert(todos).values(data)
    revalidatePath("/")
  } catch (error) {
    console.error("Failed to add todo:", error)
    throw new Error("Failed to add todo")
  }
}

export async function updateTodoStatus(id: number, completed: boolean) {
  try {
    await db.update(todos).set({ completed, updatedAt: new Date() }).where(eq(todos.id, id))
    revalidatePath("/")
  } catch (error) {
    console.error("Failed to update todo:", error)
    throw new Error("Failed to update todo")
  }
}

export async function deleteTodo(id: number) {
  try {
    await db.delete(todos).where(eq(todos.id, id))
    revalidatePath("/")
  } catch (error) {
    console.error("Failed to delete todo:", error)
    throw new Error("Failed to delete todo")
  }
}

