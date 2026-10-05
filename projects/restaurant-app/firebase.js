import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUYT4O7MclcrYWFRTlNbvtTAy8nG06Ot8",
  authDomain: "restaurant-app-d2fcd.firebaseapp.com",
  projectId: "restaurant-app-d2fcd",
  storageBucket: "restaurant-app-d2fcd.firebasestorage.app",
  messagingSenderId: "250322203109",
  appId: "1:250322203109:web:621ea292959a7f1fdd7f0c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);