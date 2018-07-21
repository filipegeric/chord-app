/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    user: null,
    registerErorrs: null,
    loginError: null,
    token: null,
  },
  getters: {
    signedIn(state) {
      return state.signedIn;
    },
    user(state) {
      return state.user;
    },
    registerErrors(state) {
      return state.registerErorrs;
    },
    loginError(state) {
      return state.loginError;
    },
  },
  mutations: {
    changeRegisterErrors(state, payload) {
      state.registerErorrs = payload;
    },
    changeLoginError(state, payload) {
      state.loginError = null;
    },
    login(state, payload) {
      state.signedIn = true;
      state.token = payload.token;
      localStorage.token = payload.token;
      //not finished
    },
    logout(state) {
      state.signedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    tryRegister({ commit, state, dispatch}, payload) {
      axios.post('/auth/register/', payload).then((response) => {
        commit('login', response.data);
      }).catch((err) => {
        console.log(err.response);
        commit('changeRegisterErrors', err.response.data.message);
      });
    },
    tryLogin({ commit, state }, payload) {
      axios.post('/auth/login/', payload).then((response) => {
        commit('login', response.data);
      }).catch((err) => {
        console.log(err.response);
        state.loginError = true;
      });
    },
  },
});
