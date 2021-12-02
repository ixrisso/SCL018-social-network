import { auth } from '../firebase/firebase.js';

export const feedPost = (postedPost) => {
  const postContainer = document.querySelector('#post');
  postContainer.innerHTML = '';
  const templatePosted = (dataPost) => {
    let templatePost = `
      <article class='newpost' >
      <h2>esto es una prueba</h2>
      <div class="userId" id="${dataPost.userId}">
      <h4 class='gameTitle'> ${dataPost.boardgame} </h4>
      <div class='gameDescription'>${dataPost.description}</div>
      <div id ='countLike'>
      <button class='like'> 
      <i class='italic'></i> ME GUSTA <span class="counterStat">...</span>
      </button>
      </div>
      </article>`;

    if (dataPost.data.userId === auth.currentUser.uid) {
      templatePost += `
      <article class='newpost' >
      <h4 class='gameTitle'> ${dataPost.boardgame} </h4>
      <div class='gameDescription'>${dataPost.description}</div>
      <button value"${dataPost.userId}" class='edit'>Editar</button>
      <button class='delete'>Eliminar</button>
      </div>
      </div>
      </article>`;
    } else {
      templatePost += `
      <article class='newpost' >
      <h4 class='gameTitle'> ${dataPost.boardgame} </h4>
      <div class='gameDescription'>${dataPost.description}</div>
      </div>
      </div>
      </article>`;
    }

    postContainer.innerHTML += templatePost;
  };
  postedPost.forEach(templatePosted);
};
