export default {
  async addRequest(_, payload) {
    const apiUrl = import.meta.env.VITE_FIREBASE_DB_API_URL;
    const coachId = payload.coachId;
    const url = `${apiUrl}/requests/${coachId}.json`;
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to send a request!');
    }
  },

  async loadRequests(context) {
    const apiUrl = import.meta.env.VITE_FIREBASE_DB_API_URL;
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const url = `${apiUrl}/requests/${userId}.json?auth=${token}`;
    const response = await fetch(url);

    if (!response.ok) {
      context.commit('setRequests', []);
      throw new Error("Failed to fetch requests' data!");
    }

    const data = (await response.json()) || [];

    const requests = Object.entries(data).map(([id, request]) => {
      return { ...request, id };
    });

    context.commit('setRequests', requests);
    context.commit('setLastRequestsFetch');
  },

  async shouldFetchRequests(context) {
    const lastFetch = context.getters.lastRequestsFetch;

    if (!lastFetch) {
      await context.dispatch('loadRequests');
      return;
    }

    const currentTime = new Date().getTime();
    if ((currentTime - lastFetch) / 1000 > 60) {
      context.dispatch('requests/loadRequests');
    }
  },
};
