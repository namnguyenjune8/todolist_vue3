<template>
    <p :class="['todo-item', todo.completed ? 'is-completed': '']">
        <input type="checkbox" :checked="todo.completed" @change="makeCompleted" />
        {{ todo.task }}
        <button class="del-btn" @click="deleteItem">Delete</button>
    </p>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'TodoItem',
    props: ['taskId','todos'],
    setup(props,context) {
        const makeCompleted = () => {
            context.emit('itemcompleted', props.taskId)
        }
        const deleteItem = () => {
            context.emit('deleteItem', props.taskId)
        }
        const todo = computed(() => {
      return props.todos.find((todo) => todo.id === props.taskId);
    });

    return {
        makeCompleted,
        deleteItem,
        todo,
    }
}
}
</script>

<style>
.del-btn {
    background: #ff0000;
    color: #fff;
    border: none;
    cursor: pointer;
    float: right;
    border-radius: 5px; 
}
.todo-item {
    background: #f4f4f4;
    padding: 10px;
    margin: 0;
    border-bottom: 1px#ccc dotted;
}
.is-completed {
    text-decoration: line-through   ;
    opacity: 0.5;
}
</style>