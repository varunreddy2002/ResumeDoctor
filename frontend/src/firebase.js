// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvPoy0QUhoWVSZUd7NS4kds94gn1dYpnM",
  authDomain: "resumedoctor-142e2.firebaseapp.com",
  projectId: "resumedoctor-142e2",
  storageBucket: "resumedoctor-142e2.firebasestorage.app",
  messagingSenderId: "473689584627",
  appId: "1:473689584627:web:aff939c385d5d0064a1886",
  measurementId: "G-SJ4YL73Q9B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
