const editProfileBtn = document.querySelector('#editProfileBtn');
const editProfileClose = document.querySelector('#editProfileClose');
const editProfileModal = document.querySelector('#editProfileModal');

function editModal() {
  editProfileModal.classList.remove('hidden');
}

if (editProfileBtn) { // to avoid console errors
  editProfileBtn.addEventListener('click', editModal);

  editProfileClose.addEventListener('click', () =>
    editProfileModal.classList.add('hidden'),
  );
}
