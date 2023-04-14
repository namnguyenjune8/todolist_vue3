
<template>
  <div>
    <div class="todo-buttons">
      <AddTodo v-on:add-todo="addTodo"/>
    <button @click="markAllComplete" class="button_doneAll">Done All Task</button>
    <button @click="deleteAll" class="button_deleteAll">Delete All Task</button>
   
  </div>
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
    
  </div>
</template>


  <script>
  import { ref, onMounted, computed} from 'vue';
  import TodoItem from './TodoItem';
  import axios from 'axios';
  import AddTodo from './AddTodo';
  import { mapMutations } from 'vuex';
  
  export default {
  
    name: 'task',
    components: {
      TodoItem,
      AddTodo,
    },
    //Tính tổng các task cùng tag hoặc subtag
    computed: {
    personalTasksTotal() {
      let personalTasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].tag === 'Personal') {
          personalTasksTotal++;
        }
      }
      return personalTasksTotal;
    },
    homeTasksTotal() {
      let homeTasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'Home') {
          homeTasksTotal++;
        }
      }
      return homeTasksTotal;
    },
    familyTasksTotal() {
      let familyTasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'Family') {
          familyTasksTotal++;
        }
      }
      return familyTasksTotal;
    },
    myFirstBookTasksTotal() {
      let myFirstBookTasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'My First Book') {
          myFirstBookTasksTotal++;
        }
      }
      return myFirstBookTasksTotal;
    },
    workTasksTotal() {
      let workTasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].tag === 'Work') {
          workTasksTotal++;
        }
      }
      return workTasksTotal;
    },
    newWebsite_TasksTotal() {
      let newWebsite_TasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'Client - New website') {
          newWebsite_TasksTotal++;
        }
      }
      return newWebsite_TasksTotal;
    },
    email_TasksTotal() {
      let email_TasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'Client - Email design') {
          email_TasksTotal++;
        }
      }
      return email_TasksTotal;
    },
    rebrand_TasksTotal() {
      let rebrand_TasksTotal = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].subtag === 'Client - Rebrand') {
          rebrand_TasksTotal++;
        }
      }
      return rebrand_TasksTotal;
    },
  },

  //phương thức gửi dữ liệu total vào store của Vuex
    methods: {
    ...mapMutations(['SET_TOTAL_TASKS']),
    updateTotalTasks() {
      this.SET_TOTAL_TASKS(this.totalTasks);
    },
    ...mapMutations(['SET_TOTAL_TASKS_PERSONAL']),
    updateTotal_Personal_Tasks() {
      this.SET_TOTAL_TASKS_PERSONAL(this.personalTasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_HOME']),
    updateTotal_Home_Tasks() {
      this.SET_TOTAL_TASKS_HOME(this.homeTasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_FAMILY']),
    updateTotal_Family_Tasks() {
      this.SET_TOTAL_TASKS_FAMILY(this.familyTasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_MYFIRSTBOOK']),
    updateTotal_MyFirstBook_Tasks() {
      this.SET_TOTAL_TASKS_MYFIRSTBOOK(this.myFirstBookTasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_WORK']),
    updateTotal_Work_Tasks() {
      this.SET_TOTAL_TASKS_WORK(this.workTasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_WEBSITE']),
    updateTotal_NewWebsite_Tasks() {
      this.SET_TOTAL_TASKS_WEBSITE(this.newWebsite_TasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_EMAIL']),
    updateTotal_Email_Tasks() {
      this.SET_TOTAL_TASKS_EMAIL(this.email_TasksTotal);
    },
    ...mapMutations(['SET_TOTAL_TASKS_REBRAND']),
    updateTotal_Rebrand_Tasks() {
      this.SET_TOTAL_TASKS_REBRAND(this.rebrand_TasksTotal);
    },
  },
  watch: {
    totalTasks() {
      this.updateTotalTasks();
    },
    personalTasksTotal() {
      this.updateTotal_Personal_Tasks();
    },
    homeTasksTotal() {
      this.updateTotal_Home_Tasks();
    },
    familyTasksTotal() {
      this.updateTotal_Family_Tasks();
    },
    myFirstBookTasksTotal() {
      this.updateTotal_MyFirstBook_Tasks();
    },
    workTasksTotal() {
      this.updateTotal_Work_Tasks();
    },
    newWebsite_TasksTotal() {
      this.updateTotal_NewWebsite_Tasks();
    },
    email_TasksTotal() {
      this.updateTotal_Email_Tasks();
    },
    rebrand_TasksTotal() {
      this.updateTotal_Rebrand_Tasks();
    },
  },
    setup() {
      const tasks = ref([]);
      let editingTask = null;
   
      const totalTasks = computed(() => {
        return tasks.value.length;
      });
      //check task completed
      const markComplete = (id) => {
      axios.put(`/task/${id}`, {}, {
        withCredentials: true,
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        // Update the completed state of the task in the local state
        const task = tasks.value.find((task) => task._id === id);
        task.completed = !task.completed;
        task.save();
      })
      .catch((error) => {
        console.log(error);
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
  tasks.value.forEach((task) => {
    if (!task.completed) {
      task.completed = true;
      axios.put(`/task/${task._id}`, task, {
        withCredentials: true,
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        console.log(`Task ${task._id} marked as completed`);
      })
      .catch((error) => {
        console.log(error);
      });
    }
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

      return {
        tasks,
        markComplete,
        addTodo,
        deleteTodo,
        deleteAll,
        markAllComplete,
        saveEdit,
        editingTask,
        totalTasks,
    
      };
    },
};
  
  
  </script>


<style scoped lang="scss">

</style>