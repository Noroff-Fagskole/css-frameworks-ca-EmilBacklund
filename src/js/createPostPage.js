import { getToken } from './helpers/localStorage';
import { CREATE_POST_ENDPOINT } from './settings/api';

const createPostFrom = document.querySelector('#createPostForm');
const profilePagePostError = document.querySelector('#emptyPostNotification');
const homePagePostError = document.querySelector('#errorHandler');

const postBody = document.querySelector('#postBody');

createPostFrom.addEventListener('submit', (event) => {
  event.preventDefault();

  let isPostBody = false;
  if (postBody.value.trim().length > 0) {
    isPostBody = true;
  }

  const isFormValid = isPostBody;

  if (isFormValid) {
    const postTitle = `${postBody.value
      .split(' ')
      .slice(0, 3)
      .join(' ')}..`;

    const postData = {
      title: postTitle,
      body: postBody.value,
    };

    (async function createPost() {
      const response = await fetch(CREATE_POST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // window.location.reload();
      } else {
        const message = 'Creating post failed';
        throw new Error(message);
      }
      createPostFrom.reset();
    })().catch((err) => {
      if (profilePagePostError) {
        profilePagePostError.innerHTML = `${err}`;
        profilePagePostError.classList.remove('hidden');
      } else if (homePagePostError) {
        homePagePostError.innerHTML = `${err}`;
        homePagePostError.classList.remove('hidden');
      }
    });
  }
});
