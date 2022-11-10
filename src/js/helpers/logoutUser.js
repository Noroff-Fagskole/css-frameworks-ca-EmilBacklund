import clearStorage from './clearStorage';

function logOutUser() {
  clearStorage();
  window.location.replace('/login.html');
}

export default logOutUser;
