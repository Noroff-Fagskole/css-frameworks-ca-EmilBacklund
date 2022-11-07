export { editModal };

const editProfileBtn = document.querySelector('#editProfileBtn');
const editProfileClose = document.querySelector('#editProfileClose');
const editProfileModal = document.querySelector('#editProfileModal');

if (editProfileBtn) {
  editProfileBtn.addEventListener('click', editModal);

  editProfileClose.addEventListener('click', () => editProfileModal.classList.add('hidden'));
}

function editModal() {
  editProfileModal.classList.remove('hidden');
}
