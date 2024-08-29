import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const authModule = {
  state: {
    userId: null,
    token: null,
  },
  mutations,
  actions,
  getters,
};

export default authModule;
