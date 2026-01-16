<template>
  <div class="page">
    <section class="card">
      <h1 class="title">Todo App</h1>

      <form class="add" @submit.prevent="onAdd">
        <input
          v-model="newTitle"
          class="input"
          type="text"
          placeholder="Add your new todo"
          :disabled="store.loading"
        />
        <button class="addBtn" type="submit" :disabled="store.loading || !newTitle.trim()">
          +
        </button>
      </form>

      <p v-if="store.error" class="error">{{ store.error }}</p>

      <ul class="list" v-if="store.items.length">
        <li class="row" v-for="t in store.items" :key="t.id">
          <button class="rowText" type="button" @click="store.toggleTodo(t.id)" :title="'Toggle: ' + t.title">
            <span class="check" :class="{ done: t.done }"></span>
            <span class="text" :class="{ done: t.done }">{{ t.title }}</span>
          </button>

          <button class="trash" type="button" @click="store.deleteTodo(t.id)" title="Delete">
            🗑
          </button>
        </li>
      </ul>

      <p v-else class="empty">No todos yet. Add your first one above.</p>

      <div class="footer">
        <span class="pending">You have {{ store.pendingCount }} pending tasks</span>
        <button class="clear" type="button" @click="store.clearAll" :disabled="!store.items.length">
          Clear All
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTodosStore } from "~/stores/todos";

const store = useTodosStore();
const newTitle = ref("");

onMounted(() => {
  store.fetchTodos();
});

async function onAdd() {
  const title = newTitle.value.trim();
  if (!title) return;

  await store.addTodo(title);
  newTitle.value = "";
}
</script>

<style scoped>
/* Page background */
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f2f4ff;
  padding: 28px 12px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* Card container */
.card {
  width: 360px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(22, 22, 40, 0.12);
  padding: 18px 18px 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.title {
  margin: 0 0 12px;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: #111;
}

/* Add row */
.add {
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 10px;
  margin-bottom: 12px;
}

.input {
  height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #d8d8e6;
  background: #fff;
  outline: none;
  font-size: 14px;
}

.input:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.18);
}

.addBtn {
  height: 44px;
  border-radius: 10px;
  border: 0;
  background: #7b61ff;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 10px 18px rgba(123, 97, 255, 0.26);
}

.addBtn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

/* Error */
.error {
  margin: 6px 0 10px;
  color: #b00020;
  font-size: 13px;
}

/* List */
.list {
  list-style: none;
  padding: 0;
  margin: 10px 0 12px;
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 40px;
  align-items: center;
  background: #f2f2f6;
  border-radius: 10px;
  overflow: hidden;
}

.rowText {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.check {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 2px solid #c7c7d6;
  background: #fff;
  flex: 0 0 16px;
}

.check.done {
  border-color: #7b61ff;
  background: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.15);
}

.text {
  font-size: 14px;
  color: #2b2b33;
}

.text.done {
  text-decoration: line-through;
  opacity: 0.6;
}

/* Trash button */
.trash {
  height: 100%;
  border: 0;
  background: #e0553f;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.trash:hover {
  filter: brightness(0.95);
}

/* Empty */
.empty {
  margin: 12px 0;
  font-size: 14px;
  opacity: 0.7;
}

/* Footer */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
}

.pending {
  font-size: 13px;
  color: #333;
  opacity: 0.85;
}

.clear {
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 0;
  background: #7b61ff;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
}

.clear:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
