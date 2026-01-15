import { defineStore } from "pinia";

export type Todo = { id: number; title: string; done: boolean };

export const useTodosStore = defineStore("todos", {
  state: () => ({
    items: [] as Todo[],
    loading: false,
    error: "" as string,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = "";
      try {
        this.items = await $fetch<Todo[]>("/api/todos");
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || "Failed to load todos";
      } finally {
        this.loading = false;
      }
    },

    async addTodo(title: string) {
      const clean = title.trim();
      if (!clean) return;

      this.error = "";
      try {
        const created = await $fetch<Todo>("/api/todos", {
          method: "POST",
          body: { title: clean },
        });
        this.items.unshift(created);
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || "Failed to add todo";
      }
    },

    async toggleTodo(id: number) {
      this.error = "";
      try {
        const updated = await $fetch<Todo>(`/api/todos/${id}/toggle`, {
          method: "PATCH",
        });
        const idx = this.items.findIndex((t) => t.id === id);
        if (idx >= 0) this.items[idx] = updated;
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || "Failed to toggle todo";
      }
    },
  },
});
