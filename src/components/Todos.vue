<template>
  <div>
    <!-- <AddTodo  @add-todo="addTodo"/> -->
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

// import AddTodo from './AddTodo'
import axios from 'axios';

export default {
    name: 'task',
    components: { 
        TodoItem, 
        // AddTodo
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
// //    const deleteTodo = async (id) => {
//   try {
//     await axios.delete(`http://localhost:3000/task/${id}`);
//     todos.value = todos.value.filter((todo) => todo.id !== id);
//   } catch (error) {
//     console.log(error);
//   }
// };
//     const addTodo = async (newTodo) => {
//     try {
//         const response = await axios.post('http://localhost:3000/task', {
//             task: newTodo.title,
//             completed: newTodo.completed,
//     })
//             todos.value.push(response.data)
//     } catch (error) {
//         console.log(error)
// }
// }
        
    return {
    todos,
    markComplete,
    // deleteTodo,
    // addTodo,
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