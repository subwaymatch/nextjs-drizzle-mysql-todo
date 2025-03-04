import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-3xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Next.js MySQL Todo App</h1>
          <p className="text-muted-foreground mt-2">A simple todo app built with Next.js, MySQL, and Drizzle ORM</p>
        </div>

        <AddTodoForm />
        <TodoList />
      </div>
      <Toaster />
    </main>
  )
}

