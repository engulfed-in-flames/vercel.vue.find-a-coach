export default {
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  coaches(state) {
    return Array.isArray(state.coaches) ? state.coaches : [];
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;

    return coaches.find((coach) => coach.id === userId);
  },
  lastCoachesFetch(state) {
    return state.lastCoachesFetch;
  },
};
