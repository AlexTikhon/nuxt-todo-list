type Todo = { id: number; title: string; done: boolean };

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id);

  const g = globalThis as any;
  if (!g.__todos) g.__todos = [];
  const todos = g.__todos as Todo[];

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    setResponseStatus(event, 404);
    return { message: "todo not found" };
  }

  todo.done = !todo.done;
  return todo;
});
