import Vue from 'vue';
import App from './App.vue';
import './plugins/vuetify'

Vue.config.productionTip = false;
const axios =  require('axios');
axios.defaults.baseURL = `http://food-order-tracker.development/api/`;
Vue.prototype.axios = axios;


new Vue({
    el: '#app',
    components: {App},
    template: '<App assetsUrl="http://food-order-tracker.development/"/>',
});


