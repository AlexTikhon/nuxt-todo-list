import { getTodos } from "../_todos.store";

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id);
  const todos = getTodos();

  const idx = todos.findIndex((t) => t.id === id);
  if (idx < 0) {
    setResponseStatus(event, 404);
    return { message: "todo not found" };
  }

  todos.splice(idx, 1);
  return { ok: true };
});
