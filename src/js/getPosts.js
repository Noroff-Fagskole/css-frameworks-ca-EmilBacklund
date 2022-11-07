import moment from 'moment/moment';
import { GET_POSTS_ENDPOINT, COMMENT_ON_POST_BY_ID } from './settings/api';
import { getToken } from './helpers/localStorage';

const searchInputMobile = document.querySelector('#searchInputMobile');
const searchInputPc = document.querySelector('#searchInputPc');

const postHandler = document.querySelector('#postHandler');
let postData = [];

const timeNow = moment(new Date());

if (!getToken()) {
  location.href = '/login.html';
}

searchInputPc.addEventListener('keyup', (e) => {
  const searchValue = e.target.value;
  searchInputMobile.value = e.target.value;

  const filteredData = postData.filter(({ title, body }) => (
    title.toLowerCase().includes(searchValue)
      || body.toLowerCase().includes(searchValue)
  ));
  displayPosts(filteredData);
});

searchInputMobile.addEventListener('keyup', (e) => {
  const searchValue = e.target.value;
  searchInputPc.value = e.target.value;

  const filteredData = postData.filter(({ title, body }) => (
    title.toLowerCase().includes(searchValue)
      || body.toLowerCase().includes(searchValue)
  ));
  displayPosts(filteredData);
});

const sortPostsDropdown = document.querySelector('#sortPosts');

const SORTING_POSTS_ENDPOINT = 'sort=created&sortOrder=desc';

sortPostsDropdown.addEventListener('change', () => {
  const dropdownValue = sortPostsDropdown.options[sortPostsDropdown.selectedIndex].value;
  let endpoint = SORTING_POSTS_ENDPOINT;
  if (dropdownValue === 'createdDesc') {
    endpoint = 'sort=created&sortOrder=desc';
  } else if (dropdownValue === 'createdAsc') {
    endpoint = 'sort=created&sortOrder=asc';
  } else if (dropdownValue === 'titleDesc') {
    endpoint = 'sort=title&sortOrder=desc';
  } else if (dropdownValue === 'titleAsc') {
    endpoint = 'sort=title&sortOrder=asc';
  }
  getAllPosts(endpoint);
});

async function getAllPosts(endpoint) {
  const response = await fetch(`${GET_POSTS_ENDPOINT}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    postData = await response.json();
    displayPosts(postData);
  } else {
    const err = await response.json();
    throw new Error(err);
  }
}
getAllPosts(SORTING_POSTS_ENDPOINT)
  .then(() => {
    const commentForm = document.querySelectorAll('#commentForm');
    const comment = document.querySelectorAll('#comment');

    for (let i = 0; i < commentForm.length; i++) {
      commentForm[i].addEventListener('submit', (e) => {
        e.preventDefault();

        const postData = {
          body: comment[i].value,
        };

        handleCommentPostById(comment[i].dataset.id, postData);
      });
    }
  })
  .then(() => {})
  .catch((err) => {
    // alert(err);
  });

function handleCommentPostById(postID, data) {
  const commentOnPost = async () => {
    try {
      const response = await fetch(`${COMMENT_ON_POST_BY_ID}/${postID}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        getAllPosts(SORTING_POSTS_ENDPOINT);
      }
    } catch (error) {
      alert(error);
    }
  };
  commentOnPost();
}

const displayPosts = (data) => {
  const HTML_POSTS = data
    .map(({
      body, title, created, _count, media, author, comments, id,
    }) => {
      function isImage(url) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }

      if (!isImage(media)) {
        media = '';
      }

      let profilePicture = author.avatar;

      if (!isImage(profilePicture)) {
        profilePicture = 'svg/noAvatar.svg';
      }

      const createdDate = created;
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

      function printOutHtml() {
        let commentSection = '';
        let avatar = '<img src="svg/noAvatar.svg" alt="" />';

        // TODO need to fix avatar image to correct user
        if (isImage(author.avatar)) {
          avatar = `<img class="rounded-full h-8 w-8" src="${author.avatar}" alt="" />`;
        }

        for (let i = 0; i < comments.length; i++) {
          if (comments[i].body) {
            commentSection += `
            <div class="flex gap-5 items-center">
            ${avatar}
            <p class="w-full break-all"><span class="text-[#BC4848]">${comments[i].owner}:</span> ${comments[i].body}</p>
            </div>`;
          }
        }
        return commentSection;
      }

      return `
    <div class="py-5 px-2 bg-[#282828] rounded-[20px] sm:mx-0 xl:px-5 mb-5">
          <a class="mb-2" href="../userPost.html?post_id=${id}">
           <p class="transition duration-300 hover:bg-[#BC4848] rounded">${title}</p>
          </a>
          <div class="w-full h-0.5 bg-[#2C2C2C] mb-5"></div>
          <div class="flex flex-col gap-2 xl:gap-5">
            <div class="flex gap-2 xl:gap-5 relative">
              <div class="overflow-hidden w-[100px] h-[100px] rounded-[10px]">
              <img class="h-full w-full object-cover" src="${profilePicture}" alt="" />
              </div>
              <div class="flex flex-col justify-between">
                <div>
                  <div class="flex gap-2 xl:gap-5">
                    <p>${author.name}</p>
                    <img src="svg/favourite_active.svg" alt="" />
                  </div>
                  <p class="text-sm text-[#868686]">@CuteOwl</p>
                </div>
                <div class="flex gap-2 items-center">
                  <div
                    class="w-[5px] h-[5px] bg-[#BC4848] rounded-[5px]"
                  ></div>
                  <p class="text-[#BC4848]">${timeSinceCreated}${time}</p>
                </div>
              </div>
              <img
              id="postOptions"
                class="absolute top-0 right-0 pointer"
                src="svg/kebab_menu.svg"
                alt=""
              />
            </div>
            <p>${body}</p>
            <img src="${media}" />
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 text-[#868686] text-sm">
                <p>${_count.comments} comments</p>
                <div
                  class="w-[5px] h-[5px] bg-[#868686] rounded-[5px]"
                ></div>
                <p>${_count.reactions} reactions</p>
              </div>
              <div class="w-full h-0.5 bg-[#2C2C2C]"></div>
              <div class="flex gap-2 xl:gap-5">
                <img src="svg/heart_active.svg" alt="" />
                <img src="svg/share.svg" alt="" />
                <img src="svg/something.svg" alt="" />
              </div>
                <div class="w-full h-0.5 bg-[#2C2C2C]"></div>
                     ${printOutHtml()}

            </div>
            <form data-id="${id}" id="commentForm" class="flex gap-2 xl:gap-5 relative items-center">
              <img class="h-8 w-8 rounded-full" src="${profilePicture}" alt="" />
              <input
              id="comment"
              data-id="${id}"
                class="text-sm xsm:text-base w-full rounded-[10px] text-[#868686] indent-2 h-[38px] bg-[#222222]"
                type="text"
                placeholder="Write something.."
              />
             <button data-id="${id}" class="bg-green-600 h-[38px] whitespace-nowrap rounded-[10px] px-5">Send</button>
            </form>
          </div>
        </div>
    `;
    })
    .join('');

  postHandler.innerHTML = HTML_POSTS;
};
