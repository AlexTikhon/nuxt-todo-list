<template>
  <form @submit.prevent="submit" style="display: flex; gap: 8px; margin: 16px 0;">
    <input
      v-model="title"
      :disabled="disabled"
      placeholder="New todo..."
      style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 8px;"
      @keydown.enter.exact.prevent="submit"
    />
    <button
      type="submit"
      :disabled="disabled || !title.trim()"
      style="padding: 10px 14px; border-radius: 8px; border: 1px solid #333; background: white;"
    >
      Add
    </button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "add", title: string): void;
}>();

const title = ref("");

function submit() {
  const clean = title.value.trim();
  if (!clean || props.disabled) return;

  emit("add", clean);
  title.value = "";
}
</script>
