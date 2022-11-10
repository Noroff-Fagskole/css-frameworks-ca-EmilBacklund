import '../style.css';
import createHTML from './helpers/dynamicHTML';
import logOutUser from './helpers/logoutUser';

createHTML();

const logOutBtn = document.querySelector('#logOutBtn');

if (logOutBtn) {
  logOutBtn.addEventListener('click', logOutUser);
}
