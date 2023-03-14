<template>
  <form @submit="addItem">
  <input type="text" placeholder="New to do..." v-model="title" @input="check">
  <input type="submit" value="Add" class="add-btn">
  </form>
</template>

<script>
import {ref} from 'vue'
import {v4 as uuidv4} from 'uuid'
export default {
    name: 'AddTodo',
    setup(props, context) {
        const title = ref('')
        const check = () => {

        } 
        const addItem = event => {
            event.preventDefault()

            const newItem = {
                id: uuidv4(),
                title: title.value,
                completed: false,
            }
            context.emit('addTodo', newItem)
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