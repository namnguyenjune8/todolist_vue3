<template>
  <div class="todo-item" :class="{ completed: task.completed }">
    <input type="checkbox" class="todo-item-checkbox" @change="markCompleted" :checked="task.completed">
    <template v-if="isEditing">
      <input type="text" class="todo-item-input" v-model="title" @keydown.enter="saveEdit" @keydown.esc="cancelEdit">
      <button class="todo-item-btn-save" @click="saveEdit">Save</button>
      <button class="todo-item-btn-cancel" @click="cancelEdit">Cancel</button>
    </template>
    <template v-else>
      <span class="todo-item-title">{{ task.title }}</span>
      <button class="todo-item-btn-edit" @click="startEdit">Edit</button>
      <button class="todo-item-btn-delete" @click="deleteItem">Delete</button>
    </template>
  </div>
</template>
<script>
export default {
  name: 'TodoItem',
  props: ['task'],
  data() {
    return {
      isEditing: false,
      title: this.task.title,
    };
  },
  methods: {
    markCompleted() {
      this.$emit('itemcompleted', this.task._id);
    },
    startEdit() {
      this.isEditing = true;
    },
    saveEdit() {
  if (this.title.trim()) {
    const newItem = {
      ...this.task,
      title: this.title.trim(),
    };
    this.$emit('saveitem', newItem);
    this.isEditing = false;
  }
},
    cancelEdit() {
      this.isEditing = false;
      this.title = this.task.title;
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
  color: #ccc; 
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.todo-item-checkbox {
  margin-right: 10px;
}

.todo-item-title {
  flex-grow: 1;
  margin-left: 40px;
}

.todo-item-input {
  flex-grow: 1;
}

.todo-item-btn-edit,
.todo-item-btn-delete {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.todo-item-btn-edit {
  right: 60px;
  color: green !important;
}

.todo-item-btn-delete {
  right: 0;
}

.todo-item-btn-save,
.todo-item-btn-cancel {
  margin-left: 10px;
}
</style>