
  <template>
    <div>
      <div class="todo-list">
        <div v-for="task in todos" :key="task._id">
          <TodoItem :task="task" />
          <input type="checkbox" :checked="task.completed" @change="markComplete(task._id)">
          <button @click="deleteTodo(task.id)">Delete</button>
        </div>
      </div>
      <a href="/sign-in">Đăng xuất</a>
    </div>
  </template>
  <script> 
  import {ref, onMounted} from 'vue'
  import TodoItem from './TodoItem'
  import axios from 'axios';
  
  export default {
    name: 'task',
    components: { 
      TodoItem, 
    },
    setup() {
      const todos = ref([]);
      const markComplete = (id) => {
        todos.value = todos.value.map((todo) => {
          if (todo.id === id) todo.completed = !todo.completed;
          return todo;
        });
      }
      onMounted(() => {
      axios.get('http://localhost:3000/task')
        .then(response => {
          todos.value = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    });

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
