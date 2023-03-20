<template>
  <div>
    <div class="todo-list">
      <TodoItem v-for="task in todos" 
        :key="task._id" 
        :taskID="task.id" 
        :todos="todos"
        @itemcompleted="markComplete" 
        @deleteItem ="deleteTodo"/>
    </div>
    <a href="/sign-in">Đăng xuất</a>
  </div>
</template>

<script> 
import {ref} from 'vue'
import TodoItem from './TodoItem'

import axios from 'axios';

export default {
    name: 'task',
    components: { 
        TodoItem, 
    },
    setup() {
        const todos = ref([]);
        axios.get('http://localhost:3000/task')
    .then(response => {
        todos.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });
    const markComplete = (id) => {
      todos.value = todos.value.map((todo) => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      });
    }

        
    return {
    todos,
    markComplete,
}
    }

}
</script>

<style>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>