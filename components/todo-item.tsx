"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { updateTodoStatus, deleteTodo } from "@/app/actions"
import type { Todo } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleStatusChange = async (checked: boolean) => {
    setIsUpdating(true)
    try {
      await updateTodoStatus(todo.id, checked)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update todo status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTodo(todo.id)
      toast({
        title: "Success",
        description: "Todo deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border rounded-lg mb-2 transition-opacity",
        isDeleting && "opacity-50",
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleStatusChange}
          disabled={isUpdating || isDeleting}
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            todo.completed && "line-through text-muted-foreground",
          )}
        >
          {todo.title}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isDeleting}
        className="h-8 w-8 text-destructive"
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

