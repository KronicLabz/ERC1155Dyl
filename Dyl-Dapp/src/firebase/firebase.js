import firebase from 'firebase/app'
import 'firebase/storage'

var  firebaseConfig = {
  apiKey: "AIzaSyBqJGyyzWipxMPA4_JX7mhlaQrM9ED1Ovw",
  authDomain: "distrotokentesting.firebaseapp.com",
  projectId: "distrotokentesting",
  storageBucket: "distrotokentesting.appspot.com",
  messagingSenderId: "99924945354",
  appId: "1:99924945354:web:b8ded8b4a58954743f0733",
  measurementId: "G-H9TCBGBNFN"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage()


export  {
    storage, firebase as default
  }