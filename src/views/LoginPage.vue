<template>
  <div class="login-page">
    <div class="login-container">
      <img src="@/assets/logo.jpg" alt="Logo" class="logo" />
      <h2 class="login-title">Login to Jobcrest</h2>

      <div class="input-group">
        <label for="role">Login As </label>
        <select v-model="role" required>
          <option disabled value="">Select Role</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div class="input-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" placeholder="Enter username" required />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter password" required />
      </div>

      <button class="login-btn" @click="handleLogin">Login</button>
      <button class="create-btn" @click="showModal = true">Create Admin Account</button>

      <p class="error-message" v-if="loginError">{{ loginError }}</p>
      <p class="success-message" v-if="registerSuccess">Account created! Await Superadmin approval.</p>
      <p class="error-message" v-if="registerError">{{ registerError }}</p>
    </div>

    <!-- Modal for Admin Registration -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h3>Create Admin Account</h3>
        <div class="input-group">
          <label>Username</label>
          <input v-model="newUsername" type="text" placeholder="Username" />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input v-model="newEmail" type="email" placeholder="Email" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input v-model="newPassword" type="password" placeholder="Password" />
        </div>
        <button class="create-btn" @click="registerAdmin">Register</button>
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
      role: '',
      loginError: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
      registerError: '',
      registerSuccess: false,
      showModal: false
    };
  },
  methods: {
    async handleLogin() {
      this.loginError = '';
      try {
        const response = await this.$axios.post('http://127.0.0.1:8000/api/token/', {
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
        console.error(error.response?.data || error);
        this.loginError = 'Invalid credentials. Try again.';
      }
    },

    async registerAdmin() {
      this.registerError = '';
      this.registerSuccess = false;
      try {
        await this.$axios.post('http://127.0.0.1:8000/api/register-admin/', {
          username: this.newUsername,
          email: this.newEmail,
          password: this.newPassword
        });
        this.registerSuccess = true;
        this.newUsername = '';
        this.newEmail = '';
        this.newPassword = '';
        this.showModal = false;
      } catch (error) {
        console.error(error.response?.data || error);
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
   