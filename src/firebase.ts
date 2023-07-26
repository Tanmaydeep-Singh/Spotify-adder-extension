import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7zeXn4hCOKmB_Ju2cW408Q4b2-FY6dY0",
  authDomain: "spotify-adder-cc943.firebaseapp.com",
  projectId: "spotify-adder-cc943",
  storageBucket: "spotify-adder-cc943.appspot.com",
  messagingSenderId: "979522366996",
  appId: "1:979522366996:web:2824437e6c24ceca1e4101",
  measurementId: "G-0DXKMDB8RG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig), db = getFirestore(app);



