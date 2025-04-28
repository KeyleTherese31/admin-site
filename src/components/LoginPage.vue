<template>
    <div>
      <h1>Admin Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', { username: this.username, password: this.password });
          this.$router.push({ name: 'dashboard' });
        } catch (error) {
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  