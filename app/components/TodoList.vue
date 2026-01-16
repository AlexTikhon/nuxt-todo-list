<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" style="color: #b00020;">{{ error }}</p>

    <p v-else-if="todos.length === 0" style="opacity: 0.75;">
      No todos yet. Add your first one above.
    </p>

    <ul v-else style="list-style: none; padding: 0; display: grid; gap: 10px;">
      <TodoItem
        v-for="t in todos"
        :key="t.id"
        :todo="t"
        :disabled="disabled"
        @toggle="$emit('toggle', $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "~/stores/todos";

defineProps<{
  todos: Todo[];
  loading: boolean;
  error: string;
  disabled?: boolean;
}>();

defineEmits<{
  (e: "toggle", id: number): void;
}>();
</script>
