<template>
  <div class="todo-item" :class="{ completed: task.completed }">
    <input type="checkbox" @change="markCompleted" :checked="task.completed">
    <span>{{ task.title }}</span>
    <button @click="editItem">Sửa</button>
    <button @click="deleteItem">Xóa</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['task'],
  methods: {
    markCompleted() {
      this.$emit('itemcompleted', this.task._id);
    },
    editItem() {
      this.$emit('deleteItem', this.task._id);  
    },
    deleteItem() {
      this.$emit('deleteItem', this.task._id);  
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #ccc; /* màu chữ cho task đã hoàn thành */
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-item input[type="checkbox"] {
  margin-right: 10px;
}

.todo-item button {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
}
</style>






