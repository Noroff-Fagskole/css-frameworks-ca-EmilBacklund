export { openPostOptionModal };

function openPostOptionModal() {
  const deleteBtn = document.querySelectorAll('delete-post-btn');
  const postOption = document.querySelectorAll('.postOption');
  const postOptionModal = document.querySelectorAll('.postOptionModal');

  console.log(postOption);
  console.log(postOptionModal);

  for (let i = 0; i < postOption.length; i++) {
    postOption[i].addEventListener('click', function () {
      console.log(`${i} you clicked me`);
      postOptionModal[i].classList.toggle('hidden');
    });

    // fungerar inte
    postOptionModal.addEventListener('keydown', (e) => {
      if (e.key.code == 27) {
        postOptionModal[i].classList.add('hidden');
      }
    });
  }
}
