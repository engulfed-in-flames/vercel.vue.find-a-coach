import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router/router.js';
import store from './stores/index.js';

import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
// import BaseDialog from './components/base/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/base/BaseDialog.vue')
);

createApp(App)
  .use(router)
  .use(store)
  .component('BaseCard', BaseCard)
  .component('BaseButton', BaseButton)
  .component('BaseBadge', BaseBadge)
  .component('BaseSpinner', BaseSpinner)
  .component('BaseDialog', BaseDialog)
  .mount('#app');
