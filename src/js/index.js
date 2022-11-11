import '../style.css';
import createHTML from './helpers/dynamicHTML';
import logOutUser from './helpers/logoutUser';

createHTML();

const logOutBtn = document.querySelector('#logOutBtn');
const logOutBtnMobile = document.querySelector('#logOutBtnMobile');

if (logOutBtn) {
  logOutBtn.addEventListener('click', logOutUser);
}

if (logOutBtnMobile) {
  logOutBtnMobile.addEventListener('click', logOutUser);
}
