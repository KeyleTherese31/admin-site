<template>
    <div>
      <h1>Jobseeker's CV Form Entries</h1>
      <div v-for="(cv, index) in cvEntries" :key="index">
        <h3>{{ cv.name }}</h3>
        <button @click="previewCV(cv.id)">Preview</button>
        <button @click="downloadCV(cv.id)">Download</button>
        <button @click="evaluateCV(cv.id)">Evaluate</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cvEntries: [], // This will hold the submitted CV entries
      };
    },
    methods: {
      fetchCVEntries() {
        // Fetch the CV entries from the backend API
      },
      previewCV(id) {
        // Show the CV in a modal or new page
      },
      downloadCV(id) {
        // Logic to download the CV file (API call to backend)
      },
      evaluateCV(id) {
        // Open an evaluation form or show evaluation options for the selected CV
      },
    },
    created() {
      this.fetchCVEntries();
    },
  };
  </script>
  