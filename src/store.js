/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const methods = {
  keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
  getRawKey(key) {
    if(key.length == 1) {
      return key;
    }
    let a = key[0];
    if(key[1] == '#' || key[1] == 'b') {
      a += key[1];
    }
    return a;
  },
  getNextKey(key) {
    let a = this.keys.indexOf(key);
    if(a == 11) {
      return this.keys[0];
    } else {
      return this.keys[a + 1];
    }
  },
  getPreviousKey(key) {
    let a = this.keys.indexOf(key);
    if(a == 0) {
      return this.keys[11];
    } else {
      return this.keys[a - 1];
    }
  }
};

export default new Vuex.Store({
  state: {
    signedIn: false,
    user: null,
    registerErorrs: null,
    loginError: null,
    token: null,
    keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
    transpose: 0,
    songInFocus: null
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
    keys(state) {
      return state.keys;
    },
    transpose(state) {
      return state.transpose;
    }
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
    },
    setSongInFocus(state, payload) {
      state.songInFocus = payload;
    },
    setTranspose(state, payload) {
      // this could be refactored
      let rawKey = methods.getRawKey(state.songInFocus.key);
      let a = state.keys.indexOf(rawKey);
      if(payload > state.transpose) {
        if(a == 11) {
          state.songInFocus.key = state.songInFocus.key.replace(rawKey, state.keys[0]);
        } else {
          state.songInFocus.key = state.songInFocus.key.replace(rawKey, state.keys[a + 1]);
        }
      } else {
        if(a == 0) {
          state.songInFocus.key = state.songInFocus.key.replace(rawKey, state.keys[11]);
        } else {
          state.songInFocus.key = state.songInFocus.key.replace(rawKey, state.keys[a - 1]);
        }
      }

      state.songInFocus.body = state.songInFocus.body.replace(/<code>[A-Za-z0-9#]+<\/code>/g, (match) => {
        let chord = match.replace('<code>', '').replace('</code>', '');
        let rawChord = methods.getRawKey(chord);
        let opt = chord.substring(rawChord.length);
        if(payload > state.transpose) {
          rawChord = methods.getNextKey(rawChord);
        } else {
          rawChord = methods.getPreviousKey(rawChord);
        }
        return `<code>${rawChord + opt}</code>`;
      });

      if(state.transpose == 11 || state.transpose == -11) {
        state.transpose = 0;
      } else {
        state.transpose = payload;
      }

    },
    resetTranspose(state) {
      state.transpose = 0;
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
