// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Pl2lV2_kmA2-2cyYfL6eK_NFYJu0xGA",
  authDomain: "segurtecsurl-78633.firebaseapp.com",
  projectId: "segurtecsurl-78633",
  storageBucket: "segurtecsurl-78633.appspot.com",
  messagingSenderId: "149404511924",
  appId: "1:149404511924:web:031090283071aae984f1e1",
  measurementId: "G-LD5RFZ647B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);