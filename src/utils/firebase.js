// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDOsKdo68OJLElEjD8O-iRsjjAq-Ji2pGk",
	authDomain: "product-3d94f.firebaseapp.com",
	projectId: "product-3d94f",
	storageBucket: "product-3d94f.firebasestorage.app",
	messagingSenderId: "364431930292",
	appId: "1:364431930292:web:0da4fdafb991303d5e78e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
