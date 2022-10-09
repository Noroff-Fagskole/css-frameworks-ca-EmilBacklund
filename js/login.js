import { openModal, closeModal } from './helpers/modals/modals.signup';

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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isUserNameValid = false;
  if (username.value.trim().length > 1) {
    usernameError.classList.add('hidden');
    isUserNameValid = true;
  } else {
    usernameError.classList.remove('hidden');
  }

  let isPasswordValid = false;
  if (password.value.trim().length > 7) {
    passwordError.classList.add('hidden');
    isPasswordValid = true;
  } else {
    passwordError.classList.remove('hidden');
  }

  let isConfirmPassword = false;
  if (confirmPassword.value.trim().length > 7) {
    confirmPasswordError.classList.add('hidden');
    isConfirmPassword = true;
  } else {
    confirmPasswordError.classList.remove('hidden');
  }

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword();

  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailError.classList.add('hidden');
    isEmail = true;
  } else {
    emailError.classList.remove('hidden');
  }

  let isEmailValid = false;
  if (email.value.trim().length && validateEmail(email.value)) {
    emailErrorNotValid.classList.add('hidden');
    isEmailValid = true;
  } else if (email.value.trim().length && !validateEmail(email.value)) {
    emailErrorNotValid.classList.remove('hidden');
  }
});

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
  } else {
    confirmPasswordNotMatching.classList.add('hidden');
    confirmPasswordError.classList.add('hidden');
    return true;
  }
}

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  if (email.match(regEx)) {
    return true;
  } else {
    return false;
  }
}
