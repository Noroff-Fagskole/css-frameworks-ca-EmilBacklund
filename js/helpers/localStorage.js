export {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
  getUserNameInLocalStorage,
};

// const tokenKey = 'token';
// const userKey = 'user';

function saveTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

function saveUserInLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserNameInLocalStorage() {
  const user = localStorage.getItem('user', user);
  if (user) {
    return JSON.parse(user);
  } else {
    return [];
  }
}
