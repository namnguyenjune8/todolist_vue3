<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form class="form-signup" @submit.prevent="signup">
      <div class="form-group"> 
      <label for="user">User:</label>
      <input class="form-control" type="text" v-model="user" required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input class="form-control"  type="password" v-model="password" required>
    </div>
      <button class="signup-button">Sign Up</button>
    </form>
    <a href="./sign-in">Already have an account?</a>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
  async signup() {
    // Gọi API đăng ký và xử lý kết quả
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: this.user,
        password: this.password
      })
      // Xử lý kết quả trả về ở đây
      if (response.status === 200) {
        this.successMessage = 'Sign Up Success'  
      } else if (response.status === 400 && response.data.message === 'Username already exists') {
          this.errorMessage = 'Username already used, please choose another name'

      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(error)
      this.errorMessage = error.message

    }
  }
}
};
</script>
<style lang="scss">

</style>
