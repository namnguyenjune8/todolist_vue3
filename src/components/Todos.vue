
<template>
  <div>
    <AddTodo v-on:add-todo="addTodo"/>
    <div class="todo-list">
      <TodoItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @itemcompleted="markComplete"
        @deleteItem="deleteTodo"
        @saveitem="saveEdit"
        :todos="tasks"
        :taskId="task._id"
        :editingTask="editingTask"
      />
    </div>
    
    <div class="todo-buttons">
    <button @click="markAllComplete" class="done-all-button">Done All Task</button>
    <button @click="deleteAll" class="delete-all-button">Delete All Task</button>
    <button @click="handleLogout" class="logout-button">Log Out</button>
  </div>

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
      let editingTask = null;
      //check task completed
      const markComplete = (id) => {
        tasks.value = tasks.value.map((task) => {
          if (task._id === id) task.completed = !task.completed;
          return task;
        });
      };     
   //Xử lý thêm task mới
      const addTodo = (newTodo) => {
          tasks.value.push(newTodo);
        };  
      //Xử lý delete 1 task
        const deleteTodo = (id) => {
            axios.delete(`/task/${id}`, { 
              withCredentials: true,
              headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
              }
            })
            .then(() => {
                tasks.value = tasks.value.filter((task) => task._id !== id);
          });
        };
        //Xử lý delete toàn bộ task của user
       const deleteAll = () => {
          axios.delete('/tasks', {
            withCredentials: true,
            headers: {
              'Authorization': localStorage.getItem('accessToken'),
              'Content-Type': 'application/json'
            },
            params: {
              createdBy: localStorage.getItem('userId')
            }
          })
          .then((response) => {
            tasks.value = [];
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        };        
// Xử lý check completed toàn bộ task
   const markAllComplete = () => {
      tasks.value.forEach(task => {
        task.completed = true;
      });
      axios.put('/task', tasks.value, { 
        withCredentials: true,
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    };
// Xử lý lưu lại dữ liệu khi bấm vô nút save 
    const saveEdit = (editedTask) => {
      axios.put(`/task/${editedTask._id}`, editedTask, {
        withCredentials: true,
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          const updatedTask = response.data;
          const taskIndex = tasks.value.findIndex((task) => task._id === updatedTask._id);
          tasks.value.splice(taskIndex, 1, updatedTask);
          editingTask = null;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
      //lọc lại dữ liệu sau khi thao tác và trả ra giao diện
  onMounted(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId'); 
        axios.get('/task', { 
          withCredentials: true,
          headers: {
            Authorization:`${token}`,
            'Content-Type': 'application/json'
          },
          params: {
                createdBy: userId
              }
            })  
          .then((response) => {
            tasks.value = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
// Xử lý log out
      const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      window.location.href = '/sign-in';
      };

      return {
        tasks,
        markComplete,
        addTodo,
        deleteTodo,
        deleteAll,
        markAllComplete,
        handleLogout,
        saveEdit,
        editingTask,
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

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.done-all-button {
  background-color: #2196F3;
}

.delete-all-button {
  background-color: #f44336;
}

.logout-button {
  background-color: #555;
}
.todo-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>