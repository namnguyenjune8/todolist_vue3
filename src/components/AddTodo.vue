<template>
  <div>
    <button class="button_add" @click="showModal = true">+ Add new task</button>
    <div class="modal" v-if="showModal">
      <div class="modal-overlay" @click="showModal = false"></div>
      <div class="modal-container">
        <form @submit.prevent="addTask">
          <input class="modal_input" placeholder="New to do..." v-model="task.title" @input="check" />
          <select class="primary_select" v-model="task.tag">
            <option value="">Select Tag</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
          <select class="primary_select" v-if="task.tag === 'Personal'" v-model="task.subtag">
            <option value="">Select Subtag</option>
            <option value="Home">Home</option>
            <option value="Family">Family</option>
            <option value="My First Book">My First Book</option>
          </select>
          <select class="primary_select" v-if="task.tag === 'Work'" v-model="task.subtag">
            <option value="">Select Subtag</option>
            <option value="Client - New website">Client - New website</option>
            <option value="Client - Email design">Client - Email design</option>
            <option value="Client - Rebrand">Client - Rebrand</option>
          </select>
          <button class="button_add">Add Task</button>
          <button class="button_cancel" @click="showModal = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showModal: false,
      task: {
        title: "",
        tag: "",
        subtag: "",
      },
    };
  },
  methods: {
    addTask() {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      console.log("Task:", this.task);
      console.log("Token:", token);
      console.log(userId);
      axios
        .post(
          "http://localhost:3000/addTask",
          {
            title: this.task.title,
            tag: this.task.tag,
            subtag: this.task.subtag,
            createdBy: userId,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$emit("add-todo", response.data);
          this.task.title = "";
          this.task.tag = "";
          this.task.subtag = "";
          this.showModal = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    check() {
      // do something
    },
  },
};
</script>

<style lang="scss">



form {
  display: flex;
  flex-direction: column;
}



</style>
