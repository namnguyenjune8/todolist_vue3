<template>
    <div class="sidebar">
      <h3>Sidebar</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        <li><a href="#">Link 4</a></li>
        <li><a href="#">Link 5</a></li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #f4f4f4;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin: 10px 0;
  }
  
  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  </style>