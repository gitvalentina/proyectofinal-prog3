import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAyQXWMooSNW3_Yma_UO-e-EjRoE15GSLE",
  authDomain: "prog-3-adc98.firebaseapp.com",
  projectId: "prog-3-adc98",
  storageBucket: "prog-3-adc98.appspot.com",
  messagingSenderId: "355471787257",
  appId: "1:355471787257:web:69689ffe599d64eaa54e28",
  measurementId: "G-N47TVENSJM"
};

app.initializeApp (firebaseConfig)

//Con estos tres metodos vamos a estar consumiendo los metodos para comunicarnos con firebase desde nuestra pantalla de registro, entre otras
export const auth = firebase.auth(); //para tener todos los metodos accesibles desde auth cuando lo importemos
export const db = app.firestore(); //nos conectamos con firebase
export const storage = app.storage();