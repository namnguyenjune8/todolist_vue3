<template>
  <div class="task-container sidebar" >
    <ul class="task-list">
      <li class="task-item" 
      :class="{ active: activeTask === 'inbox' }" @click=" setActiveTask('inbox')"
      >
      <i class="fa-solid fa-inbox" style="color: #16e7d4;"></i>Inbox
      </li>
      <li class="task-item" @click="setActiveTask('today')"
      :class="{ active: activeTask === 'today' }"
         >
        <i class="fa-sharp fa-regular fa-calendar-days"  style="color: #28e635;" ></i>
        Today
        <span class="tag-count" >{{ totalTasks }}</span>  
        
      </li>
      <li class="task-item" 
      @click="setActiveTask('upcoming')"
      :class="{ active: activeTask === 'upcoming' }"
      >
        <i class="fa-solid fa-calculator" style="color: #b238a2;"></i>Up coming
      </li>
      <li class="task-item"
      @click="setActiveTask('filter')"
      :class="{ active: activeTask === 'filter' }"
      >
        <i class="fa-solid fa-filter" style="color: #fb810e;"></i>Filters & Labels
      </li>
      <!-- Favorites -->
      <li class="favorites-header" @click="toggleFavorites">
        <i class="toggle-arrow" :class="{'fa-solid fa-angle-down': showFavorites, 'fa-solid fa-chevron-right': !showFavorites}"></i>
      <span class="favorites-title task-item">Favorites</span>
    </li>
    <ul class="favorites-list" v-show="showFavorites">
      <li class="task-item" 
      @click="setActiveTask('priority')"
      :class="{ active: activeTask === 'priority' }"
      >
        <i class="fa-solid fa-droplet" style="color: #e5331f;"></i>Highest priority work
      </li>
      <li class="task-item" 
      @click="setActiveTask('recurring')"
      :class="{ active: activeTask === 'recurring' }"
      >
        <i class="fa-solid fa-droplet" style="color: #ebbf1e;"></i>My recurring tasks
      </li>
      <li class="task-item tag_calendar"
      @click="setActiveTask('calendar')"
      :class="{ active: activeTask === 'calendar' }"
      >
        <i class="fa-solid fa-tag fa-rotate-90" style="color: #8b8e92;"></i>Calendar
      </li>
    </ul>
      <!-- Projects -->
    <li class="favorites-header" @click="toggleProjects">
        <i class="toggle-arrow" :class="{'fa-solid fa-angle-down': showProjects, 'fa-solid fa-chevron-right': !showProjects}"></i>
      <span class="favorites-title task-item">Projects</span>
    </li>
    <ul class="project-list" v-show="showProjects">
      <!-- Personal -->
      <li class="favorites-header" @click="togglePersonal">
        <i class="toggle-arrow" :class="{'fa-solid fa-angle-down': showPersonal, 'fa-solid fa-chevron-right': !showPersonal}"></i>
      <span class="task-item"><i class="fa-solid fa-circle personal-icon" style="color: #1aa824;"></i>Personal
        <span class="tag-count" >{{ personalTasksTotal }}</span>
      </span>

        </li>
        <ul class="project-list" v-show="showPersonal">
          <li class="task-item" 
             @click="setActiveTask('home')"
             :class="{ active: activeTask === 'home' }"
          >
            <i class="fa-solid fa-house-chimney-user" style="color: #10cb3f;"></i>Home
        <span class="tag-count" >{{ homeTasksTotal }}</span>

          </li>
          <li class="task-item" 
             @click="setActiveTask('family')"
            :class="{ active: activeTask === 'family' }"
          >
            <i class="fa-solid fa-people-roof" style="color: #1e8032;"></i>Family
        <span class="tag-count" >{{ familyTasksTotal }}</span>
          </li>
          <li class="task-item tag_calend ar"
             @click="setActiveTask('firstbook')"
             :class="{ active: activeTask === 'firstbook' }"
          >
            <i class="fa-solid fa-user-pen" style="color: #24602e;"></i>My first book
        <span class="tag-count" >{{ myFirstBookTasksTotal }}</span>
          </li>
        </ul>
        <!-- Work -->
        <li class="favorites-header" @click="togglePWork">
        <i class="toggle-arrow" :class="{'fa-solid fa-angle-down': showWork, 'fa-solid fa-chevron-right': !showWork}"></i>
      <span class="task-item"><i class="fa-solid fa-user work-icon" style="color: #590fa3;"></i>Work
        <span class="tag-count" >{{ workTasksTotal }}</span>
      
      </span>
        </li>
        <ul class="project-list" v-show="showWork">
          <li class="task-item" 
             @click="setActiveTask('website')"
             :class="{ active: activeTask === 'website' }"
          >
            <i class="fa-solid fa-user" style="color: #df2abe;"></i>Client - New website
        <span class="tag-count" >{{ newWebsite_TasksTotal }}</span>
          </li>
          <li class="task-item"
             @click="setActiveTask('email')"
             :class="{ active: activeTask === 'email' }"
          >
            <i class="fa-solid fa-user" style="color: #df2abe;"></i>Client - Email design
        <span class="tag-count" >{{ email_TasksTotal }}</span>
          </li>
          <li class="task-item tag_calendar" 
             @click="setActiveTask('rebrand')"
             :class="{ active: activeTask === 'rebrand' }"
          >
            <i class="fa-solid fa-user" style="color: #df2abe;"></i>Client - Rebrand
        <span class="tag-count" >{{ rebrand_TasksTotal }}</span>
          </li>
        </ul>
      
    </ul>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    },
  },  
  
  computed: {
    ...mapState({
      totalTasks: state => state.totalTasks,
      personalTasksTotal: state => state.personalTasksTotal,
      homeTasksTotal: state => state.homeTasksTotal,
      familyTasksTotal: state => state.familyTasksTotal,
      myFirstBookTasksTotal: state => state.myFirstBookTasksTotal,
      workTasksTotal: state => state.workTasksTotal,
      newWebsite_TasksTotal: state => state.newWebsite_TasksTotal,
      email_TasksTotal: state => state.email_TasksTotal,
      rebrand_TasksTotal: state => state.rebrand_TasksTotal,
    })
  },
  
data() {
  return {
    showFavorites: false,
    showProjects: false,
    showPersonal: false,
    showWork: false,
    activeTask: 'today',
  
  }
},


  methods: {
  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  },
  toggleProjects() {
    this.showProjects = !this.showProjects;
  },
  togglePersonal() {
    this.showPersonal = !this.showPersonal;
  },  
  togglePWork() {
    this.showWork = !this.showWork;
  },
  setActiveTask(task) {
      this.activeTask = task;
      this.$emit('task-selected', task);
  },
  
},
}
</script>
<style lang="scss">

</style>
