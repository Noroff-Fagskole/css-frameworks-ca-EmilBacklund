import moment from 'moment';
import { GET_POST_BY_ID_ENDPOINT } from './settings/api';
import { getToken } from './helpers/localStorage';

const timeNow = moment(new Date());

if (!getToken()) {
  window.location.href = '/login.html';
}

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postID = searchParam.get('post_id');

const postDescription = document.querySelector('#postDescription');
const postMedia = document.querySelector('#postMedia');
const postTitle = document.querySelector('#postTitle');
const authorAvatar = document.querySelector('#authorAvatar');
const authorName = document.querySelector('#authorName');
const postCreated = document.querySelector('#postCreated');
const editPostForm = document.querySelector('#editPostForm');
const currentMedia = document.querySelector('#currentMedia');

async function getPostById() {
  const response = await fetch(
    `${GET_POST_BY_ID_ENDPOINT}/${postID}?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=desc`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  const data = await response.json();

  postTitle.value = data.title;
  postDescription.value = data.body;
  postMedia.value = data.media;
  authorName.innerHTML = data.author.name;
  if (!data.author.avatar) {
    authorAvatar.src = 'images/noAvatar.svg';
  } else {
    authorAvatar.src = data.author.avatar;
  }

  if (data.media) {
    currentMedia.innerHTML = `<img class="mb-2 w-full object-cover" src="${data.media}"/>`;
    postMedia.classList.add('mb-2');
  } else {
    currentMedia.innerHTML = '';
    postMedia.classList.remove('mb-2');
  }

  const createdDate = data.created;
  let time = ' seconds ago';

  let timeSinceCreated = timeNow.diff(createdDate, 'seconds');
  if (timeSinceCreated > 59) {
    timeSinceCreated = timeNow.diff(createdDate, 'minutes');
    time = ' minutes ago';
    if (timeSinceCreated > 59) {
      timeSinceCreated = timeNow.diff(createdDate, 'hours');
      time = ' hours ago';
      if (timeSinceCreated > 24) {
        timeSinceCreated = timeNow.diff(createdDate, 'days');
        time = ' days ago';
      }
    }
  }
  postCreated.innerHTML = `${timeSinceCreated}${time}`;
}

getPostById();

editPostForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const postData = {
    title: postTitle.value,
    body: postDescription.value,
    media: postMedia.value,
  };

  async function editPost() {
    const response = await fetch(`${GET_POST_BY_ID_ENDPOINT}/${postID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      window.location.href = `userPost.html?post_id=${postID}`;
    }
  }
  editPost();
});
