import router from '../router';

const baseUrl = process.env.API_URL;

export const userService = {
  signup,
  login,
  fblogin,
  logout
};

function signup(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${baseUrl}/users/signup`, requestOptions).then(handleResponse);
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${baseUrl}/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // remember user login
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

async function fblogin() {
  const { authResponse } = await new Promise(FB.login);
  if (!authResponse) return;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      accessToken: authResponse.accessToken
    }
  };

  return fetch(`${baseUrl}/fb-authenticate`, requestOptions).then(handleResponse);
}

function logout() {
  FB.api('/me/permissions', 'delete', null, () => FB.logout());
  router.push('/login');
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
