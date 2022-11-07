import '../style.css';
import { createHTML } from './helpers/dynamicHTML';
import { clearStorage } from './helpers/localStorage';

createHTML();

const logOutBtn = document.querySelector('#logOutBtn');

function logOutUser() {
  clearStorage();
  window.location.replace('/login.html');
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logOutUser);
}
