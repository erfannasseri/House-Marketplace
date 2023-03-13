// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7x9Y_xAPyx8cltjm0D3_eQ_L2MEqC8FM",
  authDomain: "house-marketplace-a5152.firebaseapp.com",
  projectId: "house-marketplace-a5152",
  storageBucket: "house-marketplace-a5152.appspot.com",
  messagingSenderId: "722374340134",
  appId: "1:722374340134:web:50abee9331704c47c780e7",
  measurementId: "G-6M0N944FY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();