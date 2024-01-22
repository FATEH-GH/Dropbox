// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADM7vuW-Bc4IbR_EAaq_t79SyV3BDwufc",
  authDomain: "dropbox-ee709.firebaseapp.com",
  projectId: "dropbox-ee709",
  storageBucket: "dropbox-ee709.appspot.com",
  messagingSenderId: "440746431214",
  appId: "1:440746431214:web:df5cc38e1b161a53b2d9ff",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
