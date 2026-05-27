import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxf9LQ3hW1o6pTvJRMDf7TQzf9p1_cX9U",
  authDomain: "app-sewa-mobil.firebaseapp.com",
  projectId: "app-sewa-mobil",
  storageBucket: "app-sewa-mobil.appspot.com",
  messagingSenderId: "106705998490583951069",
  appId: "1:106705998490583951069:web:8a1c9b2d9c56eef7c90bf0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);