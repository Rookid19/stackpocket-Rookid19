// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigProduction = {
  apiKey: "AIzaSyCUhRHp7BWRwRZo_NkVcHxdia7iJppkCps",
  authDomain: "caldarmallafrica-e22e1.firebaseapp.com",
  projectId: "caldarmallafrica-e22e1",
  storageBucket: "caldarmallafrica-e22e1.appspot.com",
  messagingSenderId: "681314231014",
  appId: "1:681314231014:web:be3f8b2336870e1d5d1127",
  measurementId: "G-Z0CSD407WS",
};

const firebaseConfigDevelopment = {
  apiKey: "AIzaSyAqx4sX5SskgMJgVbIFZCGr0kbitxNkM2I",
  authDomain: "caldar-test.firebaseapp.com",
  projectId: "caldar-test",
  storageBucket: "caldar-test.appspot.com",
  messagingSenderId: "447792348922",
  appId: "1:447792348922:web:cda59f9f306f42fdeb5343",
  measurementId: "G-WKMGQ64VCL",
};
// Initialize Firebase

// testing

export const app = initializeApp(firebaseConfigProduction);

const db = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export const authentication = getAuth(app);

export default db;
