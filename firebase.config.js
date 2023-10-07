// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVGvxgz1ou9BVFVaM3HHJ6ERowP_i32Ys",
  authDomain: "pictureboard-3cac7.firebaseapp.com",
  projectId: "pictureboard-3cac7",
  storageBucket: "pictureboard-3cac7.appspot.com",
  messagingSenderId: "597964356004",
  appId: "1:597964356004:web:434860fde4ccf96ca8a931",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// connectStorageEmulator(storage, "localhost", 9199);
// connectFunctionsEmulator(functions, "localhost", 5001);
// connectFirestoreEmulator(db, "localhost", 8080);

export { db, auth, storage, functions, app };
