export async function fetchAuth(payload) {
  const [url, body, errorMessage] = prepareAuth(payload);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return await response.json();
}

export function prepareAuth(payload) {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  let apiUrl = null;
  let errorMessage = null;

  if (payload.mode === 'login') {
    apiUrl = import.meta.env.VITE_FIREBASE_LOGIN_API_URL;
    errorMessage = 'Failed to login!';
  }

  if (payload.mode === 'signup') {
    apiUrl = import.meta.env.VITE_FIREBASE_SIGNUP_API_URL;
    errorMessage = 'Failed to signup!';
  }

  const url = `${apiUrl}?key=${apiKey}`;
  const body = {
    email: payload.email,
    password: payload.password,
    returnSecureToken: true,
  };

  return [url, body, errorMessage];
}

export function setAuthInLocalStorage(authData) {
  localStorage.setItem('userId', authData.userId);
  localStorage.setItem('token', authData.token);
  localStorage.setItem('tokenExpiration', authData.tokenExpiration);
}

export function getAuthFromLocalStorage() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  return [userId, token, tokenExpiration];
}

export function removeAuthFromLocalStorage() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
}

export function authRedirect({ requireAuth, requireNoAuth }, isAuthenticated) {
  if (requireAuth && !isAuthenticated) {
    return { name: 'auth' };
  }

  if (requireNoAuth && isAuthenticated) {
    return { name: 'coaches' };
  }

  return null;
}
