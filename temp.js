// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzdrcmf63VHYtQNcQ0-F1wFXnwtazIL38",
  authDomain: "harsh-chat-app-ac1eb.firebaseapp.com",
  projectId: "harsh-chat-app-ac1eb",
  storageBucket: "harsh-chat-app-ac1eb.appspot.com",
  messagingSenderId: "157769095883",
  appId: "1:157769095883:web:1349a6a616164feb22594e",
  measurementId: "G-YNENQ6L59F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);