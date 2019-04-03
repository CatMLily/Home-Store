import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import Inter from './common/interface';
// 引入全局Alert
import Alert from './components/Alert/index';

Vue.use(Alert);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
window.Inter = Inter;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
