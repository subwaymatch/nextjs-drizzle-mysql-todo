import { getTodos } from "@/app/actions"
import { TodoItem } from "@/components/todo-item"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function TodoList() {
  const todos = await getTodos()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Todos</CardTitle>
        <CardDescription>
          {todos.length === 0
            ? "No todos yet. Add one to get started!"
            : `You have ${todos.length} todo${todos.length === 1 ? "" : "s"}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todos.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Your todo list is empty. Add a new todo to get started.
          </div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

