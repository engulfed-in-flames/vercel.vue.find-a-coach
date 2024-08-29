export default {
  hasRequests(state) {
    return state.requests && state.requests.length > 0;
  },
  requests(state) {
    return Array.isArray(state.requests) ? state.requests : [];
  },
  lastRequestsFetch(state) {
    return state.lastRequestsFetch;
  },
};
