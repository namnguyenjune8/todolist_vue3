import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MainPage from '@/components/MainPage.vue'
// import TodoApp from '@/components/TodoApp.vue'
import SignIn from '@/authentication/SignIn.vue'
import SignUp from '@/authentication/SignUp.vue'


const routes = [
  {
    path: '/' ,
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/main' ,
    name: 'MainPage',
    component: MainPage
  },
  // {
  //   path: '/app',
  //   name: 'TodoApp',
  //   component: TodoApp,
  //   beforeEnter: (to, from, next) => {
  //     const accessToken = localStorage.getItem('accessToken');
  //     if (!accessToken) {
  //       next('/sign-in');
  //     } else {
  //       next();
  //     }
  //   }
  // },

  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router