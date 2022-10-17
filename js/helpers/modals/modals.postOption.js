export { openPostOptionModal };

function openPostOptionModal() {
  const postOption = document.querySelectorAll('.postOption');
  const postOptionModal = document.querySelectorAll('.postOptionModal');

  for (let i = 0; i < postOption.length; i++) {
    postOption[i].addEventListener('click', function () {
      postOptionModal[i].classList.toggle('hidden');
      postOptionModal[i].classList.toggle('flex');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        postOptionModal[i].classList.add('hidden');
      }
    });
  }
}
