import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    user: null,
    registerErorrs: null,
    loginError: null,
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
    temp(state) {
      state.signedIn = !state.signedIn;
    },
    changeRegisterErrors(state, payload) {
      // TODO
    },
  },
  actions: {
    tryRegister({ commit, state, dispatch}, payload) {
      // TODO
    },
    tryLogin({ commit, state }, payload) {
      // TODO
    }
  },
});
