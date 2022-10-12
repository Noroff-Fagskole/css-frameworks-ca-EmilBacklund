export {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
  getUserNameInLocalStorage,
};

function saveTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
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
