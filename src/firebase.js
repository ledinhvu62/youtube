import firebase from 'firebase/compat/app';
import "firebase/compat/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyDGe80ek36c7vAjDD9rX9utJZhNMpNW5nk",
//   authDomain: "clone-aa236.firebaseapp.com",
//   projectId: "clone-aa236",
//   storageBucket: "clone-aa236.appspot.com",
//   messagingSenderId: "995201836155",
//   appId: "1:995201836155:web:74f8867a18568059fdaede"
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyAqVe1WifyviIQ72ndJjcKtTj3mwvgfIwk",
//     authDomain: "ytb-62.firebaseapp.com",
//     projectId: "ytb-62",
//     storageBucket: "ytb-62.appspot.com",
//     messagingSenderId: "234269527645",
//     appId: "1:234269527645:web:fdb67b71c6b345499547b4"
// }

// const firebaseConfig = {
//     apiKey: "AIzaSyCvuJej25d_-vSAtdP8AFtuNIEtTPvT4yI",
//     authDomain: "vntube-123456.firebaseapp.com",
//     projectId: "vntube-123456",
//     storageBucket: "vntube-123456.appspot.com",
//     messagingSenderId: "779016707538",
//     appId: "1:779016707538:web:0618647a8bb0e22470fc0b"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyAn5KR21i6IADlubXbyk3yYWIA_nGhDZVU",
    authDomain: "tubeyou-92087.firebaseapp.com",
    projectId: "tubeyou-92087",
    storageBucket: "tubeyou-92087.appspot.com",
    messagingSenderId: "214414617663",
    appId: "1:214414617663:web:713f9c8d57821818c8dc8a"
  };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDOQ72rUVfOTOVWjMyNuZF_CyeT0ZezVio",
  //   authDomain: "vietube-6eccb.firebaseapp.com",
  //   projectId: "vietube-6eccb",
  //   storageBucket: "vietube-6eccb.appspot.com",
  //   messagingSenderId: "556498785161",
  //   appId: "1:556498785161:web:b81c7d6a59a5be87404758"
  // };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyB2C_qIgJ8pNviv2Qj-WP8rKk4yupqYroM",
  //   authDomain: "dutup-5b4ff.firebaseapp.com",
  //   projectId: "dutup-5b4ff",
  //   storageBucket: "dutup-5b4ff.appspot.com",
  //   messagingSenderId: "1083286774746",
  //   appId: "1:1083286774746:web:0d319e53d7d547e98d16e3"
  // };
  
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDDCyB6mYABG5IcXLL5S96MYplTelzEHD8",
  //   authDomain: "harrytube-78e5b.firebaseapp.com",
  //   projectId: "harrytube-78e5b",
  //   storageBucket: "harrytube-78e5b.appspot.com",
  //   messagingSenderId: "127100454102",
  //   appId: "1:127100454102:web:54aac2ba3e6be1e9307577"
  // };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAhMFOrikT_c9th6BjD5atdvd7Ibzm4yzs",
  //   authDomain: "my-347ec.firebaseapp.com",
  //   projectId: "my-347ec",
  //   storageBucket: "my-347ec.appspot.com",
  //   messagingSenderId: "1034959957127",
  //   appId: "1:1034959957127:web:2d5cf103ba0969fa0e9c22"
  // };
  

firebase.initializeApp(firebaseConfig)

export default firebase.auth()