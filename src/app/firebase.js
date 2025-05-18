// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7lVAVUyzYB8Wp_Raf-eeFpp9qkWMB9oY",
    authDomain: "billiard-auth-db.firebaseapp.com",
    projectId: "billiard-auth-db",
    storageBucket: "billiard-auth-db.firebasestorage.app",
    messagingSenderId: "287654227957",
    appId: "1:287654227957:web:9d0554a2507a64f4ba3abc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);