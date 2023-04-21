// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOLQzZPAieh7w5CrlOJtSv6SotUzNrZ4Y",
  authDomain: "netflix-clone-c3f60.firebaseapp.com",
  projectId: "netflix-clone-c3f60",
  storageBucket: "netflix-clone-c3f60.appspot.com",
  messagingSenderId: "401164197545",
  appId: "1:401164197545:web:32ad1e7cfd1bc1815c13b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
