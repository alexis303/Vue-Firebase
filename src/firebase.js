
import firebase from 'firebase/app'


require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");


import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyBwUoEqyeEdoPvPG6Uow_hS-Ua6lH6u-1w",
  authDomain: "listaregalo-69a48.firebaseapp.com",
  databaseURL: "https://listaregalo-69a48.firebaseio.com",
  projectId: "listaregalo-69a48",
  storageBucket: "listaregalo-69a48.appspot.com",
  messagingSenderId: "230177132745",
  appId: "1:230177132745:web:e1676439a023d03cfafd18",
  measurementId: "G-1LZ7MMRL2Z"
};

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
  firebase,
  auth,
  db,
  storage,
  functions
}