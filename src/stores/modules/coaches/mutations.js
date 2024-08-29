export default {
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setLastCoachesFetch(state) {
    state.lastCoachesFetch = new Date().getTime();
  },
};
