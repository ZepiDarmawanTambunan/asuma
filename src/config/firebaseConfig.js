// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1c5ZfjCyGxnHCNJ4I3UP9ze7OIgwd0TU",
  authDomain: "asuma-acb90.firebaseapp.com",
  projectId: "asuma-acb90",
  storageBucket: "asuma-acb90.appspot.com",
  messagingSenderId: "556419378356",
  appId: "1:556419378356:web:80c4bbc0688bf74994bbe1",
  measurementId: "G-DPJEE26L3B"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);