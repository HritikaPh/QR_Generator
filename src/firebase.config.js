// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9OeFkubZE36O2r0wS9Gg4yQUK-6BhmvU",
  authDomain: "otp-project-fc71b.firebaseapp.com",
  projectId: "otp-project-fc71b",
  storageBucket: "otp-project-fc71b.appspot.com",
  messagingSenderId: "26696018385",
  appId: "1:26696018385:web:88a3360473d3c459db58f0",
  measurementId: "G-FBZ3MLXSN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)