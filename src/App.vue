<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="home">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style>
#nav {
  text-align: center;
  padding-bottom: 10px;
}
.home {
  color: lightgreen;
}
</style>

