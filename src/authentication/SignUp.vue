<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <div>
      <label for="user">User:</label>
      <input class="form-control" type="text" v-model="user" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input class="form-control"  type="password" v-model="password" required>
    </div>
      <button type="submit"  class="btn btn-primary">Sign Up</button>
    </form>
    <a href="./sign-in">Đã có tài khoản?</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      user: '',
      password: ''
    };
  },
  methods: {
    async signup() {
      // Gọi API đăng ký và xử lý kết quả
    }
  }
};
</script>
<style>
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

</style>