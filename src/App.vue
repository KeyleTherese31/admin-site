<template>
  <div id="app">
    <!-- Optional: Navbar or header can go here -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f2f4f5;
}

#app {
  min-height: 100vh;
}
</style>
