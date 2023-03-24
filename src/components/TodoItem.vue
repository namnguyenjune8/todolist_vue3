<template>
    <p v-if="todo" :class="['todo-item', todo.completed ? 'is-completed': '']">
      <input type="checkbox" :checked="todo && todo.completed" @change="makeCompleted" />
      {{ todo.title }}
      <button class="del-btn" @click="deleteItem">Delete</button>
    </p>
  </template>
<script>
import { computed } from 'vue'
export default {
  name: 'TodoItem', 
  props: ['task', 'tasks'],
  setup(props, context) {
    const makeCompleted = () => {
      context.emit('itemcompleted', props.taskId);
    };
    const deleteItem = () => {
      context.emit('deleteItem', props.taskId);
    };
      const todo = computed(() => {
  if (props.task && props.tasks) {
    return props.tasks.find((task) => task._id === props.task._id);
  }
  return null;
});

    return {
      makeCompleted,
      deleteItem,
      todo,
    };
  },
};

</script>

<style>
.del-btn {
    background: #ff0000;
    color: #fff;
    border: none;
    cursor: pointer;
    float: right;
    border-radius: 5px; 
}
.todo-item {
    background: #f4f4f4;
    padding: 10px;
    margin: 0;
    border-bottom: 1px#ccc dotted;
}
.is-completed {
    text-decoration: line-through   ;
    opacity: 0.5;
}
</style>