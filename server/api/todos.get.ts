type Todo = { id: number; title: string; done: boolean };

export default defineEventHandler(() => {
  const g = globalThis as any;
  if (!g.__todos) {
    g.__todos = [
      { id: 1, title: "Learn Nuxt basics", done: false },
      { id: 2, title: "Add Pinia store", done: true },
    ] satisfies Todo[];
  }
  return g.__todos as Todo[];
});
