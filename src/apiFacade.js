import URL from './settings';

function apiFacade() {
  const makeOptions = (method, addToken, body) => {
    // method: GET, POST, PUT, DELETE
    // addToken: true: add JWT, false: no JWT
    // body: body to add if any
    // Return: options for fetch-method
    var opts = {
      method: method,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (addToken && loggedIn()) {
      opts.headers['x-access-token'] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  // Generic errorhandler for fetch-metod
  function handleHttpErrors(res) {
    console.log(res);
    if (!res.ok) {
      removeToken(); // Remove JWT if an error occurred
      return Promise.reject({status: res.status, fullError: res.json()});
    }
    return res.json();
  }

  // Store JWT in localStorage
  const setToken = token => {
    // console.log("setToken: ", token);
    localStorage.setItem('jwtToken', token);
  };

  // Get JWT from localStorage - if any
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  // Remove JWT from localStorage - if any
  const removeToken = () => {
    localStorage.removeItem('jwtToken');
  };

  // Return loggedIn true if there is a JWT
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  // Login and store JWT ig successful
  const login = (username, password) => {
    // console.log("apiFacade-login: ", username, password);
    const options = makeOptions('POST', true, {
      username: username,
      password: password,
    });
    // console.log("login:", options);
    return fetch(URL + '/login', options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        console.log('apiFacade-login: ', res.token);
        // TBD - Store other data from login if any - roles?
      });
  };

  // Logout and remove store JWT
  const logout = () => {
    removeToken();
  };

  const getItems = categories => {
    // categories = 'fashion,dev';
    console.log('getItems: ', URL, loggedIn());
    console.log('gi:', URL + (loggedIn() ? '/jokeByCategoryV2/' : '/jokeByCategory/') + categories);
    const options = makeOptions('GET', true);
    return fetch(URL + (loggedIn() ? '/jokeByCategoryV2/' : '/jokeByCategory/') + categories, options).then(handleHttpErrors);
  };

  return {
    // Remember all statements below are a shortcut for this version: getitems: getitems
    login,
    logout,
    loggedIn,
    getItems,
  };
}

// let returnVal = apiFacade();
// export default returnVal;
export default apiFacade();
