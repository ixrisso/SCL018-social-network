import { auth, deletePost, editPost } from '../firebase/firebase.js';

export const feedPost = (postedPost) => {
  const postContainer = document.querySelector('#post');
  postContainer.innerHTML = '';
  const templatePosted = (dataPost) => {
    let templatePost = `
      <article class='newpost' >
      <div class="userId" id="${dataPost.userId}">
      <div class="refresh"> 
      <textarea readonly class='gameTitle'>${dataPost.boardgame}</textarea>
      <textarea readonly class='gameDescription'>${dataPost.description}</textarea>
      `;

    if (dataPost.userId === auth.currentUser.uid) {
      templatePost += `
      <h5 class='loading'>¡Esperando tu actualización!</h5>
      <button value="${dataPost.id}" class='edit'>Editar/Actualizar</button>
      <button value="${dataPost.id}" class='delete'>Eliminar</button>
      </div>
      </div>
      </article>`;
    } else {
      templatePost += `
      </div>
      </div>
      </article>`;
    }

    postContainer.innerHTML += templatePost;
  };
  postedPost.forEach(templatePosted);
  // eliminar post:
  const deleteButton = postContainer.querySelectorAll('.delete');
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (confirm('¿Seguro que vas a privar al mundo de esta reseña?')) {
        deletePost(button.value);
      }
    });
  });

  // editar, actualizar post:
  const editButton = postContainer.querySelectorAll('.edit');
  editButton.forEach((button) => {
    button.addEventListener('click', () => {
      const postId = button.value;
      const preRefresh = document.querySelector('.refresh');
      const preTitle = preRefresh.querySelector('.gameTitle');
      const preDescription = preRefresh.querySelector('.gameDescription');
      preTitle.removeAttribute('readonly');
      preDescription.removeAttribute('readonly');
      const boardgame = preTitle.value;
      const description = preDescription.value;
      const msjTemp = document.querySelector('.loading');
      msjTemp.style.display = 'block';
      editPost(postId, boardgame, description);
    });
  });
};
