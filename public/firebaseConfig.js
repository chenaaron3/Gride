var firebase = require("firebase/app");

// // Add the Firebase products that you want to use
// // require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDq6O0ZeNpNYye0M8hbwq6PUAG2hDRGfoU",
    authDomain: "sbhacks2020-81ba9.firebaseapp.com",
    databaseURL: "https://sbhacks2020-81ba9.firebaseio.com",
    projectId: "sbhacks2020-81ba9",
    storageBucket: "sbhacks2020-81ba9.appspot.com",
    messagingSenderId: "129714777288",
    appId: "1:129714777288:web:3ede56d0332670ae4349fd",
    measurementId: "G-P0VMZQZPEX"
  };
  // Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}