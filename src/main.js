import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.axios = require('axios');

new Vue({
  render: h => h(App),
}).$mount('#app');
