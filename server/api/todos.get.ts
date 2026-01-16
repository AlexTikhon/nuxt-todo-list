import { getTodos } from "./_todos.store";

export default defineEventHandler(() => getTodos());

