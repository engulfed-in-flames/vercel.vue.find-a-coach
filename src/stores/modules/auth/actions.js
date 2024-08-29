import {
  fetchAuth,
  getAuthFromLocalStorage,
  removeAuthFromLocalStorage,
  setAuthInLocalStorage,
} from '../../../utils/auth';

let authTimer;

export default {
  async login(context, payload) {
    return await context.dispatch('authenticate', {
      mode: 'login',
      ...payload,
    });
  },

  async signup(context, payload) {
    return await context.dispatch('authenticate', {
      mode: 'signup',
      ...payload,
    });
  },

  async authenticate(context, payload) {
    const responseData = await fetchAuth(payload);

    const expiresIn = +responseData.expiresIn * 1000;
    const expiration = new Date().getTime() + expiresIn;
    const authData = {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: expiration,
    };

    authTimer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    setAuthInLocalStorage(authData);

    context.commit('setUser', {
      userId: authData.userId,
      token: authData.token,
    });
  },

  tryLogin(context) {
    const [userId, token, tokenExpiration] = getAuthFromLocalStorage();
    const timeRemaining = +tokenExpiration - new Date().getTime();

    if (timeRemaining < 0) {
      return;
    }

    authTimer = setTimeout(() => {
      context.dispatch('logout');
    }, timeRemaining);

    if (userId && token) {
      context.commit('setUser', {
        userId,
        token,
      });
    }
  },

  logout(context) {
    clearTimeout(authTimer);

    removeAuthFromLocalStorage();

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
};
