import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'https://challenge-database.herokuapp.com';

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  },
});
