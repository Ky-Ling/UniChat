import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDMItoa1xWhDVHzywebv0fUb9MpFNr1_KI",
    authDomain: "unichat-60a01.firebaseapp.com",
    projectId: "unichat-60a01",
    storageBucket: "unichat-60a01.appspot.com",
    messagingSenderId: "431349374621",
    appId: "1:431349374621:web:0726d7b5d221231689fe74"
  }).auth();