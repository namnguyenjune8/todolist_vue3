  <template>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="New to do..." v-model="task.title" @input="check" />
      <input type="submit" value="Add" class="add-btn" />
    </form>
  </template>

  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        task: {
          title: ''
        }
      }
    },
    methods: {
      addTask() {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId'); 
        console.log('Task:', this.task);
        console.log('Token:', token);
        console.log(userId);
        axios
      .post('http://localhost:3000/addTask', {
        title: this.task.title,
        createdBy: userId,
      }, 
        {
        withCredentials: true,
        headers: {
          Authorization: `${token}`
        } 
      })
      .then((response) => {
        console.log(response);
            this.$emit('add-todo', response.data); // gửi sự kiện add-todo với dữ liệu của công việc mới
            this.task.title = ''; // reset giá trị của input
          })
          .catch((error) => {
            console.log(error);
          });
      },
      check() {
        // do something
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
