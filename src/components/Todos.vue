<template>
  <AddTodo  @add-todo="addTodo"/>
  <TodoItem v-for="task in todos" :key="task._id" :todoProps="task" @itemcompleted="markComplete" 
  @deleteItem ="deleteTodo"/>
  <a href="/sign-in">Đăng xuất</a>
</template>

<script>
import {ref} from 'vue'
import TodoItem from './TodoItem'

import AddTodo from './AddTodo'
import axios from 'axios';
export default {
    name: 'task',
    components: { 
        TodoItem, 
        AddTodo
    },
    setup() {
        const todos = ref([]);
        axios.get('/http://localhost:3000/task')
    .then(response => {
        todos.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });
    const markComplete = id => {
        todos.value = todos.value.map(todo => {
            if(todo.id === id) todo.completed =!todo.completed
            return todo
        })
    }
    const deleteTodo = id => {
        todos.value = todos.value.filter(todo => todo.id!== id)
    }
    const addTodo = newTodo => {
        todos.value.push(newTodo)
    }
        
    return {
    todos,
    markComplete,
    deleteTodo,
    addTodo,
}
    }

}
</script>

<style>

</style>        