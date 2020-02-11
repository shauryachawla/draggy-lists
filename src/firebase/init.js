import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA610CvKoCWOcxLUDWAzFCBFxwE2RuJsaM",
    authDomain: "draggy-lists.firebaseapp.com",
    databaseURL: "https://draggy-lists.firebaseio.com",
    projectId: "draggy-lists",
    storageBucket: "draggy-lists.appspot.com",
    messagingSenderId: "933199019935",
    appId: "1:933199019935:web:d36691a7312f3e03ed07aa",
    measurementId: "G-QW6VDSW5EC"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore()