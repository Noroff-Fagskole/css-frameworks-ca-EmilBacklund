const modalSelection = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close');
const openModalButton = document.querySelector('#openModal');

function openModal(e) {
  e.preventDefault();

  modalSelection.classList.add('modal-active');
  modalSelection.classList.remove('hidden');
}

function closeModal() {
  modalSelection.classList.add('hidden');
  modalSelection.classList.remove('modal-active');
}

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

export { openModal, closeModal };
