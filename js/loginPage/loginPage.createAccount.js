export { openModal, closeModal };

const modalSelection = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close');
const openModalButton = document.querySelector('#openModal');

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

function openModal() {
  event.preventDefault();

  modalSelection.classList.add('modal-active');
  modalSelection.classList.remove('hidden');
}

function closeModal() {
  modalSelection.classList.add('hidden');
  modalSelection.classList.remove('modal-active');
}
