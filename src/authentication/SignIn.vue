<template>
    <div class="signin">
      <h1>Login</h1>
      <form @submit.prevent="login" >
        <div class="form-group">
        <label for="user">
          User:
        </label>
          <input type="text" v-model="user"  class="form-control" required>
    </div>
    <div class="form-group">
        <label>
          Password:
        </label>
          <input type="password" class="form-control" v-model="password" required>
    </div>  
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <a href="./sign-up">Đăng ký ngay!</a>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>

  </template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
  async login() {
    // Gọi API đăng nhập và xử lý kết quả
    try {
    
    const response = await axios.post('http://localhost:3000/signin', {
      user: this.user,
      password: this.password
    });
      // Xử lý kết quả trả về ở đây 
      if (response.status === 200 && response.data.token) {
          localStorage.setItem('accessToken', response.data.token);
          this.successMessage = 'Đăng nhập thành công';
          this.$router.push('/app');
    } else {
      throw new Error('Invalid login');
    }
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(error)
      this.errorMessage = 'User hoặc password không chính xác'
    }
  }
}
}




  

</script>
<style scoped>
/* .signin {
    display: flex;
    text-align: center;
    flex-direction: column;
} */
.form-group {
  margin-bottom: 1rem;
  
}


label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input[type="password"],
input[type="text"] {
  display: block;
  width: 200px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  color: #495057;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}
.error {
  color: red; 
}
.success {
  color: green;
}

</style>
