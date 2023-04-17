<template>
  <div>
    <div class="todo-item" @click="showModal = true" :class="{ completed: task.completed }">
      <input type="checkbox" class="todo-item-checkbox" @change="markCompleted" :checked="task.completed"  @click.stop>
      <span class="todo-item-title">{{ task.title }}</span>
      <div class="task-tag">
        <span class="todo-item-title" v-html="getIconClass(task.tag) + task.tag"></span>
        <div class="todo-item-title">
               <span class="icon_tag" v-html="getIconClass(task.subtag)"></span>
               <span>{{ task.subtag }}</span>
            </div>
      </div>
      
      
     
    </div>
    <div class="modal" v-if="showModal">
      <div class="modal-overlay"  @click="closeModal"></div>
      <div class="modal-container">
        <h2 class="modal_title">Task Information</h2>
        <label for="task-title">Task Title:</label>
        <input class="modal_input" id="task-title" v-model="title" :readonly="!isEditing">
        <template v-if="!isEditing"> 
          <label for="task-tag">Tag:</label>
          <span class="modal_span"> {{ tag }}</span>
          <label for="task-subtag">Subtag:</label>
          <span class="modal_span">{{ subtag }}</span>
        </template>
        <template v-else>
          <div class="modal_editTag">
          <select class="primary_select" id="task-tag" v-model="tag">
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
          <select class="primary_select" v-if="tag === 'Personal'" v-model="subtag">
            <option value="Home">Home</option>
            <option value="Family">Family</option>
            <option value="My First Book">My First Book</option>
          </select>
          <select class="primary_select" v-if="tag === 'Work'" v-model="subtag">
            <option value="Client - New website">Client - New website</option>
            <option value="Client - Email design">Client - Email design</option>
            <option value="Client - Rebrand">Client - Rebrand</option>
          </select>
        </div>
        </template>
        <div class="modal-buttons">
          <template v-if="!isEditing">
            <button class="button_add" @click="openEdit">Edit</button>
            <button class="button_deleteAll" @click="deleteItem">Delete</button>
          </template>
          <template v-else>
            <button class="button_add" @click="saveEdit">Save</button>
            <button class="button_cancel" @click="cancelEdit">Cancel</button>
          </template> 
        </div>
      </div>
      
      
    </div>  
  </div>
</template>


<script>
export default {
  name: 'TodoItem',
  props: {
    task: {
    type: Object,
    required: true
  },
  tasks: {
      type: Array,
      required: true
    }
},
  data() {
    return {
      isEditing: false,
      showModal: false,
      title: this.task.title,
      taskData: this.task,
      tag: this.task.tag,
      subtag: this.task.subtag,
      tagIcons: {
        'personal': {
         icon: 'fa-solid fa-circle personal-icon',
         color: '#1aa824'
            },
        'work': {
         icon: 'fa-solid fa-user work-icon',
         color: '#590fa3'
            },
        
      // Thêm các tag khác và icon tương ứng tại đây
    },
    subtagIcons: {
  'home': {
    icon: 'fa-solid fa-house-chimney-user',
    color: '#10cb3f'
  },
  'family': {
    icon: 'fa-solid fa-people-roof"',
    color: '#1e8032'
  },
  'my first book': {
    icon: 'fa-solid fa-user-pen',
    color: '#24602e'
  },
  'client - new website': {
    icon: 'fa-solid fa-user',
    color: '#df2abe'
  },
  'client - email design': {
    icon: 'fa-solid fa-user',
    color: '#df2abe'
  },
  'client - rebrand': {
    icon: 'fa-solid fa-user',
    color: '#df2abe'
  },
  },
    };
  },
  methods: {
    markCompleted() {
      this.$emit('itemcompleted', this.task._id);
    },
    openEdit() {
      this.showModal = true;
      this.isEditing = true;
    },
    closeModal(event) {
  if(event.target.classList.contains('modal-overlay')) {
    console.log('Click outside modal');
    this.showModal = false;
  }
  },
    saveEdit() {
      if (this.title.trim()) {
        const newItem = {
          ...this.task,
          title: this.title.trim(),
          tag: this.tag.trim(),
          subtag: this.subtag.trim(),
        };
        this.$emit('saveitem', newItem);
        this.isEditing = false;
        this.showModal = false;
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.title = this.task.title;
    },
    deleteItem() {
      this.$emit('deleteItem', this.task._id);
      this.showModal = false;
    },
    
    getIconClass(tag) {
  const icon = this.tagIcons[tag.toLowerCase()]?.icon || this.subtagIcons[tag.toLowerCase()]?.icon;
  const color = this.subtagIcons[tag.toLowerCase()]?.color || this.tagIcons[tag.toLowerCase()]?.color;
  return icon ?  `<i class="${icon}" style="color: ${color};"></i>` : '';
    },
    
    },

};
</script>



<style lang="scss">

</style>