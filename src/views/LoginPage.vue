<template>
    <div class="login-page">
      <div class="login-container">
        <img src="@/assets/logo.jpg" alt="JobCrest Logo" class="logo d-block mx-auto mb-3" />
        <h2 class="login-title">Admin Login</h2>
  
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required placeholder="Enter your username" />
          </div>
  
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required placeholder="Enter your password" />
          </div>
  
          <div class="role-selection">
            <label for="role">Role:</label>
            <select v-model="role" id="role" required>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <br>
          <button type="submit" class="login-btn">Login</button>
  
          <!-- Show register button only if role is admin -->
          <button v-if="role === 'admin'" @click.prevent="showRegister = true" class="create-btn">Create Admin Account</button>
        </form>
  
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
  
        <!-- Registration Modal -->
        <div v-if="showRegister" class="modal-overlay">
          <div class="modal-content">
            <h3>Create Admin Account</h3>
            <form @submit.prevent="registerAdmin">
              <input type="text" v-model="newUsername" placeholder="Username" required />
              <input type="email" v-model="newEmail" placeholder="Email" required />
              <input type="password" v-model="newPassword" placeholder="Password" required />
              <br />
              <button type="submit">Submit</button>
              <button type="button" @click="showRegister = false">Cancel</button>
            </form>
            <p v-if="registerError" class="error-message">{{ registerError }}</p>
            <p v-if="registerSuccess" class="success-message">Account created! Please wait for Superadmin approval.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        role: 'admin',
        loginError: '',
        showRegister: false,
        newUsername: '',
        newEmail: '',
        newPassword: '',
        registerError: '',
        registerSuccess: false
      };
    },
    methods: {
      async handleLogin() {
        this.loginError = '';
        try {
          const response = await this.$axios.post('/api/token/', {
            username: this.username,
            password: this.password
          });
  
          const { access, refresh, is_superadmin, is_admin, is_active } = response.data;
  
          if (!is_active) {
            this.loginError = 'Account not approved yet by Superadmin.';
            return;
          }
  
          if (this.role === 'superadmin' && !is_superadmin) {
            this.loginError = 'You are not authorized as Superadmin.';
            return;
          } else if (this.role === 'admin' && !is_admin) {
            this.loginError = 'You are not registered as Admin.';
            return;
          }
  
          localStorage.setItem('token', access);
          localStorage.setItem('refresh', refresh);
          localStorage.setItem('role', this.role);
          localStorage.setItem('username', this.username);
  
          this.$router.push({ name: 'dashboard' });
        } catch (error) {
          this.loginError = 'Invalid credentials. Try again.';
        }
      },
  
      async registerAdmin() {
        this.registerError = '';
        this.registerSuccess = false;
        try {
          await this.$axios.post('/api/register-admin/', {
            username: this.newUsername,
            email: this.newEmail,
            password: this.newPassword
          });
          this.registerSuccess = true;
          this.newUsername = '';
          this.newEmail = '';
          this.newPassword = '';
        } catch (error) {
          this.registerError = 'Error creating account. Username or email might already exist.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #e7d362, #2460cf);
  }
  
  .login-container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.788);
    width: 400px;
    text-align: center;
  }
  
  .login-title {
    font-size: 24px;
    margin-bottom: 1rem;
  }
  
  .logo {
    max-width: 200px;
    border-radius: 8px;
  }
  
  .input-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .input-group label {
    font-size: 14px;
  }
  
  .input-group input,
  .role-selection select {
    width: 95%;
    padding: 10px;
    margin-top: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-btn,
  .create-btn {
    width: 100%;
    padding: 12px;
    background-color: #3b8ed1;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .create-btn {
    background-color: #5058c9;
  }
  
  .login-btn:hover,
  .create-btn:hover {
    background-color: #0a4899;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 1rem;
  }
  
  .success-message {
    color: green;
    font-size: 14px;
    margin-top: 1rem;
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 350px;
    text-align: center;
  }
  </style>
  