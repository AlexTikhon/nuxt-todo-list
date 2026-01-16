<template>
  <li
    style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 10px;"
  >
    <span :style="{ textDecoration: todo.done ? 'line-through' : 'none', opacity: todo.done ? 0.6 : 1 }">
      {{ todo.title }}
    </span>

    <button
      @click="$emit('toggle', todo.id)"
      :disabled="disabled"
      style="padding: 8px 10px; border-radius: 8px; border: 1px solid #333; background: white;"
    >
      {{ todo.done ? "Undo" : "Done" }}
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from "~/stores/todos";

defineProps<{
  todo: Todo;
  disabled?: boolean;
}>();

defineEmits<{
  (e: "toggle", id: number): void;
}>();
</script>
