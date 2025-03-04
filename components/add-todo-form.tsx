"use client"

import type React from "react"

import { useState } from "react"
import { addTodo } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function AddTodoForm() {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await addTodo({ title })
      setTitle("")
      toast({
        title: "Success",
        description: "Todo added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add todo",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? "Adding..." : "Add"}
      </Button>
    </form>
  )
}

