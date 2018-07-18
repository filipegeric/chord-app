import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import MyTransition from './components/common/MyTransition';
import MySpinner from './components/common/MySpinner';

Vue.component('my-transition', MyTransition);
Vue.component('my-spinner', MySpinner);

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8000';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
