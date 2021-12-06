import { auth, deletePost } from '../firebase/firebase.js';

export const feedPost = (postedPost) => {
  const postContainer = document.querySelector('#post');
  // postContainer.innerHTML = '';
  const templatePosted = (dataPost) => {
    let templatePost = `
      <article class='newpost' >
      <div class="userId" id="${dataPost.userId}">
      <h4 class='gameTitle'> ${dataPost.boardgame} </h4>
      <div class='gameDescription'>${dataPost.description}</div>
      `;

    if (dataPost.userId === auth.currentUser.uid) {
      templatePost += `
      <button value"${dataPost.id}" class='edit'>Editar</button>
      <button value"${dataPost.id}" class='delete'>Eliminar</button>
      </div>
      </article>`;
    } else {
      templatePost += `
      </div>
      </article>`;
    }

    postContainer.innerHTML += templatePost;
  };
  postedPost.forEach(templatePosted);
  // nuestros botones:
  const deleteButton = postContainer.querySelectorAll('.delete');
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (confirm('¿Seguro que vas a privar al mundo de esta reseña?')) {
        deletePost(button.value);
        console.log(button.value);
      }
    });
  });
};
