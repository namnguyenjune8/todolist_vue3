<template>
    <div class="menu-container"  v-on:click="toggleMenu">     
        <!-- Nội dung của bảng menu -->
        <ul class="menu-list">
          <li><a href="#">Thông tin tài khoản</a></li>
          <li><a href="#">Đổi mật khẩu</a></li>
          <li><a @click="handleLogout">Đăng xuất</a></li>
        </ul>
    </div>
  </template>
  <script>
  export default {
  setup() {
// Xử lý log out
const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      window.location.href = '/sign-in';
      };
      return {
        handleLogout,
      }
    }
    }
</script>

<style scoped>
.menu-container {
  position: absolute;
  top: 50px; 
  right: 13px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.menu-container::before {
  content: "";
  position: absolute;
  top: -6px;
  right: 22px;
  border-width: 0 5px 5px 5px;
  border-style: solid; 
  border-color: transparent transparent #fffcfc transparent;
}
.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
}

.menu-list li:hover {
  background-color: #f5f5f5;
}


</style>