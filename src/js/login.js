import { LOGIN_USER_ENDPOINT } from './settings/api';
import validateEmail from './register';
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from './helpers/localStorage';
import logInUser from './helpers/logInUser';

const loginForm = document.querySelector('#loginForm');

const loginEmail = document.querySelector('#loginEmail');
const loginEmailError = document.querySelector('#loginEmailError');
const loginEmailErrorNotValid = document.querySelector(
  '#loginEmailErrorNotValid',
);

const loginPassword = document.querySelector('#loginPassword');
const loginPasswordError = document.querySelector('#loginPasswordError');

const generalErrorMessage = document.querySelector('#generalErrorMessage');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  generalErrorMessage.innerHTML = '';

  let isEmail = false;
  if (loginEmail.value.trim().length > 0) {
    loginEmailError.classList.add('hidden');
    isEmail = true;
  } else {
    loginEmailError.classList.remove('hidden');
  }

  let isValidEmail = false;
  if (loginEmail.value.trim().length && validateEmail(loginEmail.value)) {
    loginEmailErrorNotValid.classList.add('hidden');
    isValidEmail = true;
  } else {
    loginEmailErrorNotValid.classList.remove('hidden');
  }

  let isPassword = false;
  if (loginPassword.value.trim().length > 7) {
    loginPasswordError.classList.add('hidden');
    isPassword = true;
  } else {
    loginPasswordError.classList.remove('hidden');
  }

  const isLoginFormValid = isEmail && isValidEmail && isPassword;

  if (isLoginFormValid) {
    const userData = {
      email: loginEmail.value,
      password: loginPassword.value,
    };

    const userLoginEndpoint = `${LOGIN_USER_ENDPOINT}`;

    logInUser(userLoginEndpoint, userData)
      .then((loginUserData) => {
        saveUserInLocalStorage(loginUserData.saveUser);
        saveTokenInLocalStorage(loginUserData.accessToken);
        window.location.href = '/index.html';
      })
      .catch((errorMessage) => {
        generalErrorMessage.innerHTML = `${errorMessage}`;
        generalErrorMessage.classList.add('text-red-400');
      });
  }
});
