type Todo = { id: number; title: string; done: boolean };

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string }>(event);
  const title = String(body?.title ?? "").trim();

  if (!title) {
    setResponseStatus(event, 400);
    return { message: "title is required" };
  }

  const g = globalThis as any;
  if (!g.__todos) g.__todos = [];
  const todos = g.__todos as Todo[];

  const newTodo: Todo = { id: Date.now(), title, done: false };
  todos.unshift(newTodo);

  setResponseStatus(event, 201);
  return newTodo;
});
