<template>
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <button @click="goTo('test-questions')">Test & Questions</button>
        <button @click="goTo('jobseeker-answers')">Jobseeker's Answer Entries</button>
        <button @click="goTo('cv-entries')">Jobseeker's CV Entries</button>
        <button @click="goTo('settings')">Settings</button>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goTo(route) {
        this.$router.push({ name: route });
      },
    },
  };
  </script>
  