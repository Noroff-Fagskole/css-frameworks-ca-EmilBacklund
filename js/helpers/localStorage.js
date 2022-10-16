export {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
  getUserNameInLocalStorage,
  getToken,
  clearStorage,
};

function saveTokenInLocalStorage(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

function saveUserInLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserNameInLocalStorage() {
  const user = getFromStorage('user');
  if ('user') {
    return user.name;
  } else {
    return [];
  }
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return [];
  }
}

function getToken() {
  const value = localStorage.getItem('token');
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}

function clearStorage() {
  localStorage.clear();
}
