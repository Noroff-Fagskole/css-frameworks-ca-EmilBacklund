import moment from 'moment';
import { getToken } from './helpers/localStorage';
import { GET_POST_BY_ID_ENDPOINT } from './settings/api';

if (!getToken()) {
  window.location.href = '/login.html';
}

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postID = searchParam.get('post_id');

const postDetailContainer = document.querySelector('#postDetail');
const timeNow = moment(new Date());

async function postDetail() {
  const response = await fetch(
    `${GET_POST_BY_ID_ENDPOINT}/${postID}?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=desc`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  const data = await response.json();

  let profilePicture = data.author.avatar;
  const totalComments = data._count.comments; // eslint-disable-line no-underscore-dangle
  const totalReactions = data._count.reactions; // eslint-disable-line no-underscore-dangle

  if (!data.author.avatar) {
    profilePicture = 'images/noAvatar.svg';
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

  function printOutHtml() {
    let commentSection = '';
    let avatar = '<img src="images/noAvatar.svg" alt="" />';

    if (data.author.avatar) {
      avatar = `<img class="rounded-full h-8 w-8" src="${data.author.avatar}" alt="" />`;
    }

    for (let i = 0; i < data.comments.length; i += 1) {
      if (data.comments[i].body) {
        commentSection += `
          <div class="flex gap-5 items-center">
          ${avatar}
          <p class="w-full"><span class="text-[#BC4848]">${data.author.name}:</span> ${data.comments[i].body}</p>
          </div>`;
      }
    }
    return commentSection;
  }

  if (!data.media) {
    data.media = '';
  }

  postDetailContainer.innerHTML = `
  <div class="py-5 px-2 bg-[#282828] rounded-[20px] sm:mx-0 xl:px-5 mb-5">
         <p>${data.title}</p>
        <div class="w-full h-0.5 bg-[#2C2C2C] mb-5"></div>
        <div class="flex flex-col gap-2 xl:gap-5">
          <div class="flex gap-2 xl:gap-5 relative">
            <div class="overflow-hidden w-[100px] h-[100px] rounded-[10px]">
            <img class="h-full w-full object-cover" src="${profilePicture}" alt="" />
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <div class="flex gap-2 xl:gap-5">
                  <p>${data.author.name}</p>
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
          <p>${data.body}</p>
          <img class="bg-cover" src="${data.media}" />
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-[#868686] text-sm">
              <p>${totalComments} comments</p>
              <div
                class="w-[5px] h-[5px] bg-[#868686] rounded-[5px]"
              ></div>
              <p>${totalReactions} reactions</p>
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
      </div>
  `;
}

postDetail();
