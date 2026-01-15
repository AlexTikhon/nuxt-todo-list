<template>
  <main style="max-width: 720px; margin: 40px auto; font-family: system-ui;">
    <h1>Nuxt + Node Todo</h1>

    <form @submit.prevent="createTodo" style="display: flex; gap: 8px; margin: 16px 0;">
      <input
        v-model="newTitle"
        placeholder="New todo..."
        style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 8px;"
      />
      <button
        type="submit"
        style="padding: 10px 14px; border-radius: 8px; border: 1px solid #333; background: white;"
      >
        Add
      </button>
    </form>

    <p v-if="pending">Loading...</p>
    <p v-else-if="error" style="color: #b00020;">{{ error.message }}</p>

    <ul v-else style="list-style: none; padding: 0; display: grid; gap: 10px;">
      <li
        v-for="t in todos"
        :key="t.id"
        style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 10px;"
      >
        <span :style="{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1 }">
          {{ t.title }}
        </span>

        <button
          @click="toggle(t.id)"
          style="padding: 8px 10px; border-radius: 8px; border: 1px solid #333; background: white;"
        >
          {{ t.done ? "Undo" : "Done" }}
        </button>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
type Todo = { id: number; title: string; done: boolean };

const config = useRuntimeConfig();

const newTitle = ref("");

const {
  data: todos,
  pending,
  error,
  refresh,
} = await useFetch<Todo[]>(`/api/todos`, {
  // SSR-friendly: Nuxt will fetch on server for first render
});

async function createTodo() {
  const title = newTitle.value.trim();
  if (!title) return;

  await $fetch(`/api/todos`, {
    method: "POST",
    body: { title },
  });

  newTitle.value = "";
  await refresh();
}

async function toggle(id: number) {
  await $fetch(`/api/todos/${id}/toggle`, {
    method: "PATCH",
  });
  await refresh();
}
</script>
