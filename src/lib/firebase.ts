import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2CJ1fRkOI-vKUVMXkWaa1_apQh1NtPbk",
  authDomain: "app-sewa-mobil.firebaseapp.com",
  projectId: "app-sewa-mobil",
  storageBucket: "app-sewa-mobil.firebasestorage.app",
  messagingSenderId: "976616352264",
  appId: "1:976616352264:web:ef10df3eff16f9f6313fbd"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);