import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import VueGeolocation from 'vue-browser-geolocation';

import App from './App.vue';

import './registerServiceWorker';

import router from './router';
import store from './store';

// import bootstrap (& overrides) styles
import '@/assets/custom.scss';
import '@trevoreyre/autocomplete-vue/dist/style.css';

Vue.config.productionTip = false;

Vue.use(VueGeolocation);
Vue.use(Autocomplete);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
