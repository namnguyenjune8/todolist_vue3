<template>
    <div class="signin">
      <h1>Login</h1>
      <form class="form-login" @submit.prevent="login" >
        <div class="form-group">
        <label for="user">User:</label>
          <input type="text" v-model="user"  class="form-control" required>
    </div>
    <div class="form-group">
        <label>Password:</label>
          <input type="password" class="form-control" v-model="password" required>
    </div>  
        <button class="login-button">Login</button>
    </form>
    <a href="./sign-up">Sign Up now!</a>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>

  </template>
<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode';
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

           // Lưu user id vào localStorage
            const tokenData = response.data.token.split(' ')[1]; // Lấy phần token của JWT
            const decodedToken = jwt_decode(tokenData); // Giải mã token để lấy dữ liệu
            localStorage.setItem('userId', decodedToken.id);

          this.successMessage = 'Logged in successfully';
          this.$router.push('/main');
    } else {
      throw new Error('Invalid login');
    }
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(error)
      this.errorMessage = 'User or password is incorrect'
    }
  }
}
}

</script>
<style scoped lang="scss">


</style>
