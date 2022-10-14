import moment from 'moment/moment';
import { GET_LOGGED_IN_USER_POSTS_ENDPOINT } from './settings/api';
import { getToken } from './helpers/localStorage';
import { openPostOptionModal } from './helpers/modals/modals.postOption';

const timeNow = moment(new Date());

const postContainer = document.querySelector('#myPostContainer');

(async function getUserPosts() {
  const response = await fetch(GET_LOGGED_IN_USER_POSTS_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  console.log(response);

  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    console.log('My posts succeeded');
    const { posts } = jsonResponse;
    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      let createdDate = posts[i].created;
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

      console.log(posts[i].body);
      postContainer.innerHTML += `<div class="py-5 px-2 bg-[#282828] rounded-[20px] sm:mx-0 xl:px-5">
      <p class="mb-2">${posts[i].title}</p>
      <div class="w-full h-0.5 bg-[#2C2C2C] mb-5"></div>
      <div class="flex flex-col gap-2 xl:gap-5">
        <div class="flex gap-2 xl:gap-5 relative">
          <div class="overflow-hidden w-[100px] h-[100px] rounded-[10px]">
          <img class="h-full w-full bg-cover" src="${jsonResponse.avatar}" alt="" />
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
              <div modal-id="${posts[i].id}" class="postOptionModal absolute pointer-events-none -translate-x-3 right-0 shadow-3xl bg-[#282828] hidden p-5">
              <button post-id="${posts[i].id}" 
              class="delete-post-btn bg-[#BC4848] pointer-events-auto h-[38px] whitespace-nowrap w-full rounded-[10px] px-5">Delete Post</button>
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
        <div class="flex gap-2 xl:gap-5 relative">
          <img src="svg/king_frog.svg" alt="" />
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
  } else {
    const err = await response.json();
    console.log(err);
    console.log('My posts failed');
  }
})()
  .then(() => {
    openPostOptionModal();
  })
  .catch((err) => {});
