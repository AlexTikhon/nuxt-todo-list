export type Todo = { id: number; title: string; done: boolean };

export function getTodos(): Todo[] {
  const g = globalThis as any;

  if (!g.__todos) {
    g.__todos = [
      { id: 1, title: "Buy a new gaming laptop", done: false },
      { id: 2, title: "Complete a previous task", done: false },
      { id: 3, title: "Create video for YouTube", done: false },
      { id: 4, title: "Create a new portfolio site", done: false },
    ] satisfies Todo[];
  }

  return g.__todos as Todo[];
}
