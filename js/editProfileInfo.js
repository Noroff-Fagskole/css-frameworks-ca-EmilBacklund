import { getToken } from './helpers/localStorage';
import { EDIT_PROFILE_ENDPOINT } from './settings/api';

const profileImgForm = document.querySelector('#profileImgForm');
const bannerImgForm = document.querySelector('#bannerImgForm');
const profileImg = document.querySelector('#profileImg');
const bannerImg = document.querySelector('#bannerImg');

function editProfile(value) {
  async function handleProfileEdit() {
    await fetch(`${EDIT_PROFILE_ENDPOINT}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(value),
    });
  }
  handleProfileEdit();
}

profileImgForm.addEventListener('submit', e => {
  e.preventDefault();

  const profileImgData = {
    avatar: profileImg.value,
  };

  editProfile(profileImgData);
});

bannerImgForm.addEventListener('submit', e => {
  e.preventDefault();

  const bannerImgData = {
    banner: bannerImg.value,
  };

  editProfile(bannerImgData);
});
