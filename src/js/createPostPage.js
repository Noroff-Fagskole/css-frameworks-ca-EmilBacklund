import { getToken } from './helpers/localStorage';
import { CREATE_POST_ENDPOINT } from './settings/api';
import createPost from './helpers/createPost';

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

    createPost(CREATE_POST_ENDPOINT, getToken(), postData).then((response) => {
      if (!response) {
        createPostFrom.reset();
        if (profilePagePostError) {
          profilePagePostError.innerHTML = `creating post failed`;
          profilePagePostError.classList.remove('hidden');
        } else if (homePagePostError) {
          homePagePostError.innerHTML = `creating post failed`;
          homePagePostError.classList.remove('hidden');
        }
      } else {
        window.location.reload();
      }
    });
  }
});
