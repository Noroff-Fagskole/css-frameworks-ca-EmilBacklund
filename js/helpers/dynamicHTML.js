import { getUserNameInLocalStorage } from './localStorage';
export { createHTML };

function createHTML() {
  const { pathname } = document.location;

  console.log(window.location.pathname);

  const userName = document.querySelector('#userName');

  const user = getUserNameInLocalStorage();

  if (user) {
    if (userName) {
      userName.innerHTML = `${user}`;
    }
  } else if (
    !user &&
    (pathname === `index.html` || pathname === `/profilepage.html`)
  ) {
    window.location.pathname = `/login.html`;
  }
}
