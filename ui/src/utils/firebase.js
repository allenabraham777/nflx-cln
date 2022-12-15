// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "config";

const firebaseConfig = config.application.firebase;

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
