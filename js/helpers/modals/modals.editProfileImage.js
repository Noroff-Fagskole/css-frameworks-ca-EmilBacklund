export { editModal };

const editProfileBtn = document.querySelector('#editProfileBtn');
const editProfileClose = document.querySelector('#editProfileClose');
const editProfileModal = document.querySelector('#editProfileModal');

editProfileBtn.addEventListener('click', editModal);

function editModal() {
  if (editProfileBtn) {
    editProfileModal.classList.remove('hidden');
  }
}

editProfileClose.addEventListener('click', () =>
  editProfileModal.classList.add('hidden'),
);
