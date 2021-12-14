import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';
import { configureApi, initFacebookSdk } from './helpers';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

initFacebookSdk().then(app);
configureApi();
