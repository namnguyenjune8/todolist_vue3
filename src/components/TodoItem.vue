<template>
    <p :class="['todo-item', todoProps.completed ? 'is-completed': '']">
        <input type="checkbox" :checked="todoProps.completed" @change="makeCompleted" />
        {{ todoProps.title }}
        <button class="del-btn" @click="deleteItem">Delete</button>
    </p>
</template>

<script>
export default {
    name: 'TodoItem',
    props: ['todoProps'],
    setup(props,context) {
        const makeCompleted = () => {
            context.emit('itemcompleted', props.todoProps.id)
        }
        const deleteItem = () => {
            context.emit('deleteItem', props.todoProps.id)
        }
        
    return {
        makeCompleted,
        deleteItem,
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