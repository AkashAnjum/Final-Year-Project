// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCkXrXSe5HXPU0dN9ZVC5QKzJTNKNTFNe4",
    authDomain: "university-cafe-c1fa1.firebaseapp.com",
    projectId: "university-cafe-c1fa1",
    storageBucket: "university-cafe-c1fa1.appspot.com",
    messagingSenderId: "440042520954",
    appId: "1:440042520954:web:a03a4b777ddadf0d8e16c3",
    measurementId: "G-0WQCK67G7Z"
    };
  
  firebase.initializeApp(firebaseConfig);   
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const storage = firebase.storage()