import { getUserNameInLocalStorage } from './localStorage';
export { createHTML };

function createHTML() {
  const { pathname } = document.location;

  const userName = document.querySelector('#userName');

  const user = getUserNameInLocalStorage();

  if (userName) {
    userName.innerHTML = `${user}`;
  }
}
