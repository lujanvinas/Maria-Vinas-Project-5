import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZchN1Zm4hZekdaZ00bZcsPw60gGhzOUs",
    authDomain: "packing-list-cc226.firebaseapp.com",
    databaseURL: "https://packing-list-cc226.firebaseio.com",
    projectId: "packing-list-cc226",
    storageBucket: "packing-list-cc226.appspot.com",
    messagingSenderId: "624836951041",
    appId: "1:624836951041:web:3a5b1b98ba30fb431f5400"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;