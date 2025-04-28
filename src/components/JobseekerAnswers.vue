<template>
    <div>
      <h1>Jobseeker's Answer Entries</h1>
      <div>
        <h2>Jobseeker's List of Scores</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Test 1</th>
              <th>Test 2</th>
              <th>Test 3</th>
              <th>Test 4</th>
              <th>Pre-Interview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, index) in jobseekerScores" :key="index">
              <td>{{ score.name }}</td>
              <td>{{ score.test1 }}</td>
              <td>{{ score.test2 }}</td>
              <td>{{ score.test3 }}</td>
              <td>{{ score.test4 }}</td>
              <td>{{ score.preInterview }}</td>
              <td>
                <button @click="viewAnswerSheet(score.id)">Preview</button>
                <button @click="downloadAnswerSheet(score.id)">Download</button>
                <button @click="requestRetake(score.id)" :disabled="score.retakeGranted">Retake</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div>
        <h2>Jobseeker's Answer Sheet and Score</h2>
        <div v-for="(answer, index) in answerSheets" :key="index">
          <h3>{{ answer.name }}</h3>
          <button @click="previewAnswerSheet(answer.id)">Preview</button>
          <button @click="downloadAnswerSheet(answer.id)">Download</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jobseekerScores: [], // This will hold jobseeker scores and test data
        answerSheets: [], // This will hold jobseeker's answer sheet data
      };
    },
    methods: {
      fetchJobseekerScores() {
        // Fetch the jobseeker's scores data from API
      },
      fetchAnswerSheets() {
        // Fetch the jobseeker's answer sheet data from API
      },
      viewAnswerSheet(id) {
        // Logic to view the jobseeker's answer sheet (modal, new route, etc.)
      },
      downloadAnswerSheet(id) {
        // Logic to download the jobseeker's answer sheet (maybe via API call)
      },
      requestRetake(id) {
        // Request retake for the jobseeker's test
        // Update the retake status after approval
      },
    },
    created() {
      this.fetchJobseekerScores();
      this.fetchAnswerSheets();
    },
  };
  </script>
  