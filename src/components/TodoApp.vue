  <template>
      <div>
    
          <Header/>
          <Todos/>   
          
          <router-view/>
    
      </div>
      
    </template>
    
    <script>
    
    import Header from './Header.vue';
    import Todos from './Todos.vue';
    
    export default {  
      name: 'App',
      components: {
        Header,
        Todos,
        
      }
    }
    </script> 
    
    <style>
    
    </style>
    