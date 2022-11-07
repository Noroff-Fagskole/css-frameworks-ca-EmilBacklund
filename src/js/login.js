import { LOGIN_USER_ENDPOINT } from './settings/api';
import validateEmail from './register';
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from './helpers/localStorage';

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

    (async function loginUser() {
      const response = await fetch(LOGIN_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();

        saveTokenInLocalStorage(data.accessToken);

        const saveUser = {
          name: data.name,
          email: data.email,
        };

        saveUserInLocalStorage(saveUser);
        location.href = '/index.html';
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    }()).catch((error) => {
      generalErrorMessage.innerHTML = `${error}`;
      generalErrorMessage.classList.add('text-red-400');
    });
  }
});
