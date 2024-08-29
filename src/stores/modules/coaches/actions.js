export default {
  async addCoach(context, payload) {
    const apiUrl = import.meta.env.VITE_FIREBASE_DB_API_URL;
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const url = `${apiUrl}/coaches/${userId}.json?auth=${token}`;

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to add a coach!');
    }
  },

  async loadCoaches(context) {
    const apiUrl = import.meta.env.VITE_FIREBASE_DB_API_URL;
    const url = `${apiUrl}/coaches.json`;
    const response = await fetch(url);

    if (!response.ok) {
      context.commit('setCoaches', []);
      throw new Error("Failed to fetch coaches' data!");
    }

    const responseData = (await response.json()) || [];

    const coaches = Object.entries(responseData).map(([coachId, coachData]) => {
      return {
        id: coachId,
        ...coachData,
      };
    });

    context.commit('setCoaches', coaches);
    context.commit('setLastCoachesFetch');
  },

  async shouldFetchCoaches(context, payload) {
    const forceRefresh = payload.forceRefresh;
    const lastCoachesFetch = context.getters.lastCoachesFetch || null;

    if (forceRefresh || !lastCoachesFetch) {
      await context.dispatch('loadCoaches');
      return;
    }

    const currentTime = new Date().getTime();

    if ((currentTime - lastCoachesFetch) / 1000 > 60) {
      context.dispatch('loadCoaches');
    }
  },
};
