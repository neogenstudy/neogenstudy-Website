// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD48DUKgs8aHHUKPdoRmVEBeuGyrg4c-gE",
  authDomain: "neogenstudy-19044.firebaseapp.com",
  projectId: "neogenstudy-19044",
  storageBucket: "neogenstudy-19044.firebasestorage.app",
  messagingSenderId: "614211439129",
  appId: "1:614211439129:web:d92ba747c98418d508f888",
  measurementId: "G-HSBEW4LMGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
export default app;