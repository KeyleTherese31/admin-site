<template>
    <div class="test-questions">
      <h1>Test & Questions Management</h1>
  
      <!-- Question Form -->
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Test Category:</label>
          <select v-model="form.testCategory" required>
            <option disabled value="">Select Category</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
  
        <div>
          <label>Question Type:</label>
          <select v-model="form.questionType" required>
            <option disabled value="">Select Type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
  
        <div>
          <label>Question Format:</label>
          <select v-model="form.questionFormat" required>
            <option disabled value="">Select Format</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="trueFalse">True or False</option>
            <option value="shortAnswer">Short Answer</option>
            <option value="longAnswer">Long Answer</option>
            <option value="checkbox">Checkboxes</option>
          </select>
        </div>
  
        <div>
          <label>Question Content:</label>
          <textarea v-model="form.content" required></textarea>
        </div>
  
        <div v-if="needsAnswerKey">
          <label>Answer Key:</label>
          <input v-model="form.answerKey" placeholder="Correct answer" />
        </div>
  
        <button type="submit">{{ isEditing ? 'Update' : 'Create' }} Question</button>
      </form>
  
      <hr />
  
      <!-- Questions List -->
      <h2>Existing Questions</h2>
      <div v-for="question in questions" :key="question.id" class="question-card">
        <p><strong>Category:</strong> {{ question.testCategory }}</p>
        <p><strong>Format:</strong> {{ question.questionFormat }}</p>
        <p><strong>Type:</strong> {{ question.questionType }}</p>
        <p><strong>Content:</strong> {{ question.content }}</p>
        <p><strong>Created At:</strong> {{ formatDate(question.createdAt) }}</p>
  
        <button 
          :disabled="!canEdit(question.createdAt)" 
          @click="editQuestion(question)"
        >
          Edit
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'TestQuestions',
    data() {
      return {
        form: {
          id: null,
          testCategory: '',
          questionType: '',
          questionFormat: '',
          content: '',
          answerKey: ''
        },
        isEditing: false,
        questions: [],
        categories: [
          'Test 1: Image Pattern Analysis',
          'Test 2: Basic Math',
          'Test 3: Problem Analysis and Solving',
          'Test 4: Reading Comprehension',
          'Pre Interview Questionaire',
          'Sentence Completion',
          'Other'
        ]
      }
    },
    computed: {
      needsAnswerKey() {
        // Only certain formats need answer keys
        return ['multipleChoice', 'trueFalse', 'shortAnswer'].includes(this.form.questionFormat);
      }
    },
    created() {
      this.fetchQuestions()
    },
    methods: {
      async fetchQuestions() {
        try {
          const res = await axios.get('http://localhost:8000/api/questions/');
          this.questions = res.data;
        } catch (error) {
          console.error('Failed to fetch questions', error);
        }
      },
      async handleSubmit() {
        if (this.isEditing) {
          await this.updateQuestion();
        } else {
          await this.createQuestion();
        }
      },
      async createQuestion() {
        try {
          await axios.post('http://localhost:8000/api/questions/', this.form);
          this.fetchQuestions();
          this.resetForm();
        } catch (error) {
          console.error('Failed to create question', error);
        }
      },
      async updateQuestion() {
        try {
          await axios.put(`http://localhost:8000/api/questions/${this.form.id}/`, this.form);
          this.fetchQuestions();
          this.resetForm();
        } catch (error) {
          console.error('Failed to update question', error);
        }
      },
      resetForm() {
        this.isEditing = false;
        this.form = {
          id: null,
          testCategory: '',
          questionType: '',
          questionFormat: '',
          content: '',
          answerKey: ''
        }
      },
      editQuestion(question) {
        this.isEditing = true;
        this.form = { ...question };
      },
      canEdit(createdAt) {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // Approx 6 months
        return now - createdDate > sixMonths;
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      }
    }
  }
  </script>
  
  <style scoped>
  .test-questions {
    padding: 20px;
  }
  
  .question-card {
    border: 1px solid #ddd;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  