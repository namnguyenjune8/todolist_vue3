
<template>
  <div>
    <div class="todo-list">
      <TodoItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @itemcompleted="markComplete"
        @deleteItem="deleteTodo"
      />
    </div>
    <a href="/sign-in">Đăng xuất</a>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import TodoItem from './TodoItem';
import axios from 'axios';

export default {
  name: 'task',
  components: {
    TodoItem,
  },
  setup() {
    const tasks = ref([]);
    const markComplete = (id) => {
      tasks.value = tasks.value.map((task) => {
        if (task._id === id) task.completed = !task.completed;
        return task;
      });
    };
    const deleteTodo = (id) => {
      axios.delete(`http://localhost:3000/task/${id}`)
        .then(response => {
          tasks.value = tasks.value.filter(task => task._id !== id);
        })
        .catch(error => {
          console.log(error);
        });
    };
    onMounted(() => {
      axios.get('http://localhost:3000/task/user', { withCredentials: true })
        .then((response) => {
          tasks.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      tasks,
      markComplete,
      deleteTodo,
    };
  },
};
</script>


  <style>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>
