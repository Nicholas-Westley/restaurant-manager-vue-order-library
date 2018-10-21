import Vue from 'vue';
import App from './App.vue';
import './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Config from './config';

Vue.config.productionTip = false;
const axios = require('axios');
axios.defaults.baseURL = `${Config.baseUrl}/api/`;
Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    components: { App },
    template: `
        <v-app id="app">
            <App :assetsUrl="Config.baseUrl"/>
        </v-app>
    `,
});
