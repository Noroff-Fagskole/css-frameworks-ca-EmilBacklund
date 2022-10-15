import moment from 'moment/moment';
import { GET_POSTS_ENDPOINT } from './settings/api';
import { getToken } from './helpers/localStorage';

const postHandler = document.querySelector('#postHandler');

const timeNow = moment(new Date());

console.log(postHandler);

(async function getAllPosts() {
  const response = await fetch(GET_POSTS_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  console.log(response);

  if (response.ok) {
    const posts = await response.json();
    console.log(posts);

    const HTML_POSTS = posts
      .map(({ body, title, created, _count, media, author, comments, id }) => {
        const createdDate = created;
        let time = ' seconds ago';

        let profilePicture = author.avatar;

        if (!author.avatar) {
          profilePicture = `svg/noAvatar.svg`;
        }

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
          let commentSection = ``;
          let avatar = `<img src="svg/noAvatar.svg" alt="" />`;

          if (author.avatar) {
            avatar = `<img class="rounded-full h-8 w-8" src="${author.avatar}" alt="" />`;
          }

          for (let i = 0; i < comments.length; i++) {
            if (comments[i].body) {
              commentSection += `
                <div class="flex gap-5 items-center">
                ${avatar}
                <p class="w-full"><span class="text-[#BC4848]">${author.name}:</span> ${comments[i].body}</p>
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
                  <img class="h-full w-full bg-cover" src="${profilePicture}" alt="" />
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
      })
      .join('');

    postHandler.insertAdjacentHTML('beforeend', HTML_POSTS);
  } else {
    const err = await response.json();
    throw new Error(err);
  }
})().catch((err) => {
  console.log('Get posts failed');
});
