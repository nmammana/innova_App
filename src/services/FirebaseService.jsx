import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJvVQc3CJst35HO5nH5w-J1vfg8LtlhwU",
    authDomain: "innova-rehab.firebaseapp.com",
    projectId: "innova-rehab",
    storageBucket: "innova-rehab.appspot.com",
    messagingSenderId: "661992870180",
    appId: "1:661992870180:web:4e64d0eb4148b9f0b423b1",
    measurementId: "G-NPMC018Q4Z"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;