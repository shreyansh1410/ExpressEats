// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6G8DYQ-ACyNqrEJyTVDttfPXUTk2FgTA",
  authDomain: "expresseats1410.firebaseapp.com",
  projectId: "expresseats1410",
  storageBucket: "expresseats1410.appspot.com",
  messagingSenderId: "145050646890",
  appId: "1:145050646890:web:82cad992afcf5c7c608d13",
  measurementId: "G-0JP25XP0H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();