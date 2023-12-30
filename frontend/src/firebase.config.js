// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbiB-QVdStKvZnPRd8sUXBfAJWcWCtoCA",
  authDomain: "anarchygpt.firebaseapp.com",
  projectId: "anarchygpt",
  storageBucket: "anarchygpt.appspot.com",
  messagingSenderId: "663562558227",
  appId: "1:663562558227:web:c9968d0d8fc5baee3698e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
