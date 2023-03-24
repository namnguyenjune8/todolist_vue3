
  <template>
    <div>
      <AddTodo @add-todo="addTodo"/>
      <div class="todo-list">
        <TodoItem
          v-for="task in tasks"
          :key="task._id"
          :task="task"
          @itemcompleted="markComplete"
          @deleteItem="deleteTodo"
          :todos="tasks"
          :taskId="task._id"
        />
      </div>
      <a href="/sign-in">Đăng xuất</a>
    </div>
  </template>

  <script>
  import { ref, onMounted } from 'vue';
  import TodoItem from './TodoItem';
  import axios from 'axios';
  import AddTodo from './AddTodo'

  export default {
    name: 'task',
    components: {
      TodoItem,
      AddTodo,
    },
    setup() {
      const tasks = ref([]);
      const markComplete = (id) => {
        tasks.value = tasks.value.map((task) => {
          if (task._id === id) task.completed = !task.completed;
          return task;
        });
      };
      
  //     const deleteTodo = (id) => {
  //     axios.delete(`/task/${id}`)
  //         .then((response) => {
  //             console.log(response);
  //             axios.get('/task', { withCredentials: true })
  //                 .then((response) => {
  //                     tasks.value = response.data;
  //                 })
  //                 .catch((error) => {
  //                     console.log(error);
  //                 });
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // };
  const addTodo = (newTask) => {
    axios.post('http://localhost:3000/addTask', newTask, { withCredentials: true })
      .then((response) => {
        console.log(response);
        tasks.value.push(response.data); // thêm công việc mới vào danh sách
      })
      .catch((error) => {
        console.log(error);
      });
  };
      onMounted(() => {
        axios.get('http://localhost:3000/task', { withCredentials: true })
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
        // deleteTodo,
        addTodo,
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
