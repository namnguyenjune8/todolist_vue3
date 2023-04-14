<template>
  <div class="headerbar">
    <Task
    @task-selected="setActiveTask"
    />
   
      
    
    <i class="fa-solid fa-bars menu" @click="toggleSidebar" style="color: #ffffff;"></i>
    <i class="fa-solid fa-house menu" style="color: #ffffff;"></i>
    <div class="search-container">
      <input type="text" class="searchbar" placeholder="Search..."> 
      <i class="fa fa-search"></i>
    </div>
    
    <div class="icons">
      <i class="fa-light fa-plus icon" style="color: #ffffff;"></i>
      <i class="fa-regular fa-circle-question icon" style="color: #ffffff;"></i>
      <i class="fa-regular fa-bell icon" style="color: #ffffff;"></i>
    </div>

    <div class="avatar" v-if="isLoggedIn" @click="toggleMenu">
      <img :src="avatarUrl" alt="Avatar" class="avatar-image">
    </div>
    <User v-if="showUserMenu"></User>
    <a href="/sign-in" v-if="!isLoggedIn" class="login-button">Log in</a>
    <a href="/sign-up" v-if="!isLoggedIn" class="signup-button">Sign Up</a>
    <SideBar v-if="showSidebar" @close="toggleSidebar" />
 </div>
 <!-- show Todo App on Today -->
      <div v-if="activeTask === 'today'" class="todoApp">
      <TodoApp />
    </div>
 <!--   Show Inbox App on 'inbox'  -->
     <div v-if="activeTask === 'inbox'" class="todoApp">
      <InboxApp />
    </div> 
    
    
</template>

<script>
import jwt_decode from 'jwt-decode'
import User from './User.vue';
import Task from './Task.vue';
import SideBar from './Sidebar.vue';
import TodoApp from './TodoApp.vue';
import InboxApp from './Inbox.vue';
export default {
  components: {
    User,
    SideBar,
    Task,
    TodoApp,
    InboxApp,
  },
  methods: {
    toggleMenu() {
    this.showUserMenu = !this.showUserMenu;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    setActiveTask(task) {
      this.activeTask = task;
    },
   
  },

  name: 'MainPage',
  data() {
    return {
      isLoggedIn: false,
      avatarUrl: '',
      showUserMenu: false,
      showSidebar: false,
      activeTask: 'today',
  
    };
  },
  mounted() {
    
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      const decoded = jwt_decode(token);
      this.isLoggedIn = true;
      this.avatarUrl = decoded.avatarUrl || 'https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'; // Lấy URL của avatar từ thông tin đã lưu, nếu không có thì sử dụng avatar mặc định
    }
  }
}
</script>


<style lang="scss">

</style>