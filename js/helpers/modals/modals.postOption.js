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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        postOptionModal[i].classList.add('hidden');
      }
    });
  }
}
