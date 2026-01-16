import { getTodos } from "./_todos.store";

export default defineEventHandler(() => {
  const todos = getTodos();
  todos.splice(0, todos.length);
  return { ok: true };
});
