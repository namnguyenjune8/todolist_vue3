  import { createStore } from 'vuex'

  const store = createStore({
    state: {
      totalTasks: 0,
      personalTasksTotal: 0,
      homeTasksTotal: 0,
      familyTasksTotal: 0,
      myFirstBookTasksTotal: 0,
      workTasksTotal: 0,
      newWebsite_TasksTotal: 0,
      email_TasksTotal: 0,
      rebrand_TasksTotal: 0,

    },
    mutations : {
      SET_TOTAL_TASKS(state, totalTasks) {
        state.totalTasks = totalTasks;
      },
      SET_TOTAL_TASKS_PERSONAL(state, personalTasksTotal) {
        state.personalTasksTotal = personalTasksTotal;
      },
      SET_TOTAL_TASKS_HOME(state, homeTasksTotal) {
        state.homeTasksTotal = homeTasksTotal;
      },
      SET_TOTAL_TASKS_FAMILY(state, familyTasksTotal) {
        state.familyTasksTotal = familyTasksTotal;
      },
      SET_TOTAL_TASKS_MYFIRSTBOOK(state, myFirstBookTasksTotal) {
        state.myFirstBookTasksTotal = myFirstBookTasksTotal;
      },
      SET_TOTAL_TASKS_WORK(state, workTasksTotal) {
        state.workTasksTotal = workTasksTotal;
      },
      SET_TOTAL_TASKS_WEBSITE(state, newWebsite_TasksTotal) {
        state.newWebsite_TasksTotal = newWebsite_TasksTotal;
      },
      SET_TOTAL_TASKS_EMAIL(state, email_TasksTotal) {
        state.email_TasksTotal = email_TasksTotal;
      },
      SET_TOTAL_TASKS_REBRAND(state, rebrand_TasksTotal) {
        state.rebrand_TasksTotal = rebrand_TasksTotal;
      },
    },
  })

  export default store
