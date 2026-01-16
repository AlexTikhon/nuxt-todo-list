import { getTodos, type Todo } from "./_todos.store";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string }>(event);
  const title = String(body?.title ?? "").trim();

  if (!title) {
    setResponseStatus(event, 400);
    return { message: "title is required" };
  }

  const todos = getTodos();
  const newTodo: Todo = { id: Date.now(), title, done: false };
  todos.unshift(newTodo);

  setResponseStatus(event, 201);
  return newTodo;
});
