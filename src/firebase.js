// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyu3zPHWGI7Qmamx9mStYscCPY4hNgMZg",
  authDomain: "mern-estate-4e89d.firebaseapp.com",
  projectId: "mern-estate-4e89d",
  //storageBucket: "mern-estate-4e89d.appspot.com",
  storageBucket: 'mern-estate.appspot.com',
  messagingSenderId: "11007302888",
  appId: "1:11007302888:web:e3d232a01659511033bd5d"
};

// const firebaseConfig = {
//   // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: 'mern-estate.firebaseapp.com',
//   projectId: 'mern-estate',
//   storageBucket: 'mern-estate.appspot.com',
//   messagingSenderId: '1078482850952',
//   appId: '1:1078482850952:web:28f19139ab77246602fb3d',
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
