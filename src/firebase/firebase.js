// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFc9MVJcgFmH1LhiBU8R2zdHXqbIJ4o9o",
  authDomain: "fitverse-213c6.firebaseapp.com",
  projectId: "fitverse-213c6",
  storageBucket: "fitverse-213c6.firebasestorage.app",
  messagingSenderId: "162495529701",
  appId: "1:162495529701:web:cc27ff38e82e272c020a0c",
  measurementId: "G-RWXJL12DMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export{app,auth};