import { REGISTER_USER_ENDPOINT } from './settings/api';

const contactForm = document.querySelector('#contactForm');

const username = document.querySelector('#username');
const usernameError = document.querySelector('#usernameError');

const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');

const confirmPassword = document.querySelector('#confirmPassword');
const confirmPasswordError = document.querySelector('#confirmPasswordError');
const confirmPasswordNotMatching = document.querySelector(
  '#confirmPasswordNotMatching',
);

const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const generalErrorMessage = document.querySelector('#generalErrorMessage');

const allInput = document.querySelectorAll('#contactForm input');

for (let i = 0; i < allInput.length; i += 1) {
  allInput[i].addEventListener('click', event => {
    if (!event.target.nextElementSibling.classList.contains('hidden')) {
      event.target.nextElementSibling.classList.add('hidden');
    }
    if (event.target.nextElementSibling.nextElementSibling) {
      if (
        !event.target.nextElementSibling.nextElementSibling.classList.contains(
          'hidden',
        )
      ) {
        event.target.nextElementSibling.nextElementSibling.classList.add(
          'hidden',
        );
      }
    }
  });
}

function validateEmail(mail) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  if (mail.match(regEx)) {
    return true;
  }
  return false;
}

export default validateEmail;

function validatePassword() {
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;

  if (!passwordValue) {
    return false;
  }
  if (!confirmPasswordValue) {
    confirmPasswordNotMatching.classList.add('hidden');
    return false;
  }
  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordNotMatching.classList.remove('hidden');
    confirmPasswordError.classList.add('hidden');
    return false;
  }
  confirmPasswordNotMatching.classList.add('hidden');
  confirmPasswordError.classList.add('hidden');
  return true;
}

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  let isUserNameValid = false;
  if (username.value.trim().length > 1) {
    usernameError.classList.add('hidden');
    isUserNameValid = true;
  } else {
    usernameError.classList.remove('hidden');
    username.value = '';
  }

  let isPasswordValid = false;
  if (password.value.trim().length > 7) {
    passwordError.classList.add('hidden');
    isPasswordValid = true;
  } else {
    passwordError.classList.remove('hidden');
    password.value = '';
  }

  let isConfirmPasswordValid = false;
  if (confirmPassword.value.trim().length > 7) {
    confirmPasswordError.classList.add('hidden');
    isConfirmPasswordValid = true;
  } else {
    confirmPasswordError.classList.remove('hidden');
    confirmPassword.value = '';
  }

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword();

  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailError.classList.add('hidden');
    isEmail = true;
  } else {
    emailError.classList.remove('hidden');
    emailErrorNotValid.classList.add('hidden');
    email.value = '';
  }

  let isEmailValid = false;
  if (email.value.trim().length && validateEmail(email.value)) {
    emailErrorNotValid.classList.add('hidden');
    isEmailValid = true;
  } else if (email.value.trim().length && !validateEmail(email.value)) {
    emailErrorNotValid.classList.remove('hidden');
    emailError.classList.add('hidden');
    email.value = '';
  }

  const isFormValid =
    isEmailValid &&
    isEmail &&
    isValidPasswordMatch &&
    isConfirmPasswordValid &&
    isPasswordValid &&
    isUserNameValid;

  if (isFormValid) {
    generalErrorMessage.innerHTML = 'Create account success ❤️';
    generalErrorMessage.classList.remove('text-red-500');
    generalErrorMessage.classList.add('text-lime-500');

    const userData = {
      name: username.value,
      email: email.value,
      password: password.value,
    };

    (async function registerUser() {
      const response = await fetch(REGISTER_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      const err = await response.json();
      const message = `An error occurred: ${err.message}`;
      throw new Error(message);
    })().catch(err => {
      generalErrorMessage.innerHTML = `Request failed! ${err.message}`;
    });
  } else {
    generalErrorMessage.innerHTML = 'Create account failed 😥';
    generalErrorMessage.classList.remove('text-lime-500');
    generalErrorMessage.classList.add('text-red-500');
  }
});
