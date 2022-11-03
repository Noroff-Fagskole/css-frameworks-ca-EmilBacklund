import moment from 'moment/moment';
import {
  GET_LOGGED_IN_USER_POSTS_ENDPOINT,
  DELETE_POSTS_BY_ID_ENDPOINT,
} from './settings/api';
import { getToken } from './helpers/localStorage';
import { openPostOptionModal } from './helpers/modals/modals.postOption';

export { getUserPosts };

const timeNow = moment(new Date());

const postContainer = document.querySelector('#myPostContainer');
const emptyPostNotification = document.querySelector('#emptyPostNotification');
const profileImg = document.querySelector('#profileImg');
const bannerImg = document.querySelector('#bannerImg');
const shareAvatar = document.querySelector('#shareAvatar');
const mainAvatarImg = document.querySelector('#mainAvatarImg');
const mobileAvatar = document.querySelector('#mobileAvatar');
const bannerImage = document.querySelector('#bannerImage');

async function getUserPosts() {
  const response = await fetch(`${GET_LOGGED_IN_USER_POSTS_ENDPOINT}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    postContainer.innerHTML = '';
    const { posts } = jsonResponse;

    if (!posts.length) {
      emptyPostNotification.innerHTML = '<p class="mb-5 text-center text-xl">You have not posted anything yet! 🙂</p>';
    } else {
      emptyPostNotification.innerHTML = '';
    }

    document.title = `${jsonResponse.name}'s Profile`;
    profileImg.value = jsonResponse.avatar;
    bannerImg.value = jsonResponse.banner;

    mobileAvatar.src = jsonResponse.avatar;
    if (jsonResponse.banner) {
      bannerImage.src = jsonResponse.banner;
    }

    if (jsonResponse.avatar) {
      mainAvatarImg.src = jsonResponse.avatar;
      shareAvatar.src = jsonResponse.avatar;
    }

    let profileAvatar = jsonResponse.avatar;

    if (!profileAvatar) {
      profileAvatar = '/svg/noAvatar.svg';
    }

    for (let i = 0; i < posts.length; i++) {
      const createdDate = posts[i].created;
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

      if (!posts[i].media) {
        posts[i].media = '';
      }

      postContainer.innerHTML += `<div class="py-5 px-2 bg-[#282828] rounded-[20px] sm:mx-0 xl:px-5">
      <p class="mb-2">${posts[i].title}</p>
      <div class="w-full h-0.5 bg-[#2C2C2C] mb-5"></div>
      <div class="flex flex-col gap-2 xl:gap-5">
        <div class="flex gap-2 xl:gap-5 relative">
          <div class="overflow-hidden w-[100px] h-[100px] rounded-[10px]">
          <img class="h-full w-full object-cover" src="${profileAvatar}" alt="" />
          </div>
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex gap-2 xl:gap-5">
                
                  <p>${posts[i].owner}</p>
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
          <div class="absolute top-0 right-0 cursor-pointer">
            <div class="relative">
              <img
              data-type="${posts[i].id}"
                class="postOption"
                src="svg/kebab_menu.svg"
                alt=""
              />
              <div modal-id="${posts[i].id}" class="postOptionModal flex-col gap-5 absolute pointer-events-none -translate-x-3 right-0 shadow-3xl bg-[#282828] hidden p-5">
              <button data-id="${posts[i].id}" 
              class="delete-post-btn bg-[#BC4848] pointer-events-auto h-[38px] whitespace-nowrap w-full rounded-[10px] px-5">Delete Post
              </button>
              <a href="/editPost.html?post_id=${posts[i].id}">
                <button
                class="edit-post-btn bg-green-600 pointer-events-auto h-[38px] whitespace-nowrap w-full rounded-[10px] px-5">Edit Post
                </button>
              </a>
              </div>
            </div>
          </div>
        </div>
        <p>${posts[i].body}</p>
        <img src="${posts[i].media}" />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-[#868686] text-sm">
            <p> comments</p>
            <div
              class="w-[5px] h-[5px] bg-[#868686] rounded-[5px]"
            ></div>
            <p> reactions</p>
          </div>
          <div class="w-full h-0.5 bg-[#2C2C2C]"></div>
          <div class="flex gap-2 xl:gap-5">
            <img src="svg/heart_active.svg" alt="" />
            <img src="svg/share.svg" alt="" />
            <img src="svg/something.svg" alt="" />
          </div>
            <div class="w-full h-0.5 bg-[#2C2C2C]"></div>
                 
          
        </div>
        <div class="flex gap-2 xl:gap-5 relative items-center">
          <img class="rounded-full w-8 h-8 object-cover" src="${profileAvatar}" alt="" />
          <input
            class="text-sm xsm:text-base w-full rounded-[10px] text-[#868686] indent-2 h-[38px] bg-[#222222]"
            type="text"
            placeholder="Write something.."
          />
          <img
            class="absolute right-0 top-2/4 -translate-y-2/4 mr-2"
            src="svg/add_photo.svg"
            alt=""
          />
        </div>
      </div>
    </div>`;
    }
  }
}
getUserPosts()
  .then(() => {
    handleDeleteButtons();
  })
  .catch((err) => {
    postContainer.innerHTML = `Error message: ${err}`;
  });

function handleDeleteButtons() {
  openPostOptionModal();
  const deleteBtn = document.querySelectorAll('.delete-post-btn');

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
      handleDeletePostById(e.target.dataset.id);
    });
  }
}

function handleDeletePostById(postID) {
  const deletePostById = async () => {
    try {
      const response = await fetch(`${DELETE_POSTS_BY_ID_ENDPOINT}/${postID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        getUserPosts().then(() => {
          handleDeleteButtons();
        });
      } else {
        const err = await response.json();
        throw Error(err);
      }
    } catch (error) {
      alert(error);
    }
  };
  deletePostById();
}
