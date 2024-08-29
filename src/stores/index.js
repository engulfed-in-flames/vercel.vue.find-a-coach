import { createStore } from 'vuex';

import authModules from './modules/auth';
import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';

const store = createStore({
  modules: {
    auth: authModules,
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
