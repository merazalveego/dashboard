// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDa8jslgxE4z_mYdIW6FyVDLu765z4_ZZ0",
    authDomain: "plp-files-dashboard.firebaseapp.com",
    projectId: "plp-files-dashboard",
    storageBucket: "plp-files-dashboard.firebasestorage.app",
    messagingSenderId: "527400780248",
    appId: "1:527400780248:web:352e9b57a2236e4d3132ad",
    measurementId: "G-NMZ00GXGLJ"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadToFirebase = async (file, filename) => {
  const storageRef = ref(storage, filename);
  return await uploadBytes(storageRef, file);
};
