// Importar funciones necesarias para usar firebase (SDKs)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js';
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
// En este enlace hay más SDK: https://firebase.google.com/docs/web/setup#available-libraries
// const container = document.getElementById('root');

// Configuración firebase v7.20.0
const firebaseConfig = {
  apiKey: 'AIzaSyDs1DSRW6_kwqsLzPZWUUtUxUdL8-ZDFf8',
  authDomain: 'mewple.firebaseapp.com',
  projectId: 'mewple',
  storageBucket: 'mewple.appspot.com',
  messagingSenderId: '796773484437',
  appId: '1:796773484437:web:e3e0968973725fff71d89c',
  measurementId: 'G-8S82JZCCV4',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

// Inicializar ingreso Google con redireccionamiento
const provider = new GoogleAuthProvider();
// signInWithRedirect(auth, provider);

// Crear Usuario en firebase con correo y contraseña
export const createUser = (emailSignup, passwordSignup) => {
  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      window.location.hash = '#/login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log('ya tenías tu cuenta registrada 😸');
    });
};
// [END auth_signup_password_modular]

// Ingreso autenticación google
export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // funcion a muro (then)
      // ...
      window.location.hash = '#/feed';
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signed = (emailSignup, passwordSignup) => {
  signInWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      // redireccionar al muro
      console.log('validando');
      window.location.hash = '#/feed';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
