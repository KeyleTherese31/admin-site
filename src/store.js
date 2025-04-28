// src/store.js

import Vue from 'vue';
import Vuex from 'vuex';
import api from './axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('token/', credentials);
        const { access, refresh } = response.data;
        commit('setToken', access);
        commit('setUser', { username: credentials.username });
        api.defaults.headers['Authorization'] = `Bearer ${access}`;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout({ commit }) {
      commit('logout');
      api.defaults.headers['Authorization'] = '';
    },
  },
  modules: {},
});
