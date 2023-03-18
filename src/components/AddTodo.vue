<template>
  <form @submit="addItem">
  <input type="text" placeholder="New to do..." v-model="title" @input="check">
  <input type="submit" value="Add" class="add-btn">
  </form>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'
const baseURL = 'http://localhost:3000'

export default {
    name: 'AddTodo',
    setup(props, context) {
        const title = ref('')
        
        const addItem = async () => {
      if (!title.value.trim()) return
      try {
        const response = await axios.post(`${baseURL}/tasks`, {
          title: title.value,
          completed: false
        })
        const newTodo = response.data
        context.emit('addTodo', newTodo)
        title.value = ''
      } catch (error) {
        console.log(error)
      }
    }
    const check = () => {
      // Add any additional checks as needed
    }
        return {
            title,
            check,
            addItem,
            
        }
        
    }
}
</script>

<style scoped>
    form {
        display: flex;
    }
    input[type='text'] {
        flex: 10;
        padding: 5px;

    }
    input[type='submit'] {
        flex: 2;
    }
</style>