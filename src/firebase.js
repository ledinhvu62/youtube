import firebase from 'firebase/compat/app';
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAqVe1WifyviIQ72ndJjcKtTj3mwvgfIwk",
  authDomain: "ytb-62.firebaseapp.com",
  projectId: "ytb-62",
  storageBucket: "ytb-62.appspot.com",
  messagingSenderId: "234269527645",
  appId: "1:234269527645:web:fdb67b71c6b345499547b4"
}

// const firebaseConfig = {
//   apiKey: "AIzaSyDGe80ek36c7vAjDD9rX9utJZhNMpNW5nk",
//   authDomain: "clone-aa236.firebaseapp.com",
//   projectId: "clone-aa236",
//   storageBucket: "clone-aa236.appspot.com",
//   messagingSenderId: "995201836155",
//   appId: "1:995201836155:web:74f8867a18568059fdaede"
// }

firebase.initializeApp(firebaseConfig)

export default firebase.auth()