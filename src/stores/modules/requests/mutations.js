export default {
  setRequests(state, payload) {
    state.requests = payload;
  },
  setLastRequestsFetch(state) {
    state.lastRequestsFetch = new Date().getTime();
  },
};
