import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import MyTransition from './components/common/MyTransition.vue';
import MySpinner from './components/common/MySpinner.vue';

Vue.component('my-transition', MyTransition);
Vue.component('my-spinner', MySpinner);

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8000/api';
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
