import { getUserNameInLocalStorage } from './localStorage';

export { createHTML };

function createHTML() {
  const { pathname } = document.location;
  const userName = document.querySelector('#userName');
  const user = getUserNameInLocalStorage();

  if (user) {
    if (userName) {
      userName.innerHTML = `${user}`;
    }
  } else if (
    !user &&
    (pathname === 'index.html' || pathname === '/profilePage.html')
  ) {
    window.location.pathname = '/login.html';
  }
}
