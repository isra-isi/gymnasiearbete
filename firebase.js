import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDf7nswqcTC3Ji1EXCpHrBZiU1YkC1WVDg",
  authDomain: "cyberrage-gy.firebaseapp.com",
  projectId: "cyberrage-gy",
  storageBucket: "cyberrage-gy.firebasestorage.app",
  messagingSenderId: "254360313362",
  appId: "1:254360313362:web:685d5c96d4d427e9fd02cb",
  measurementId: "G-CQX99YW9BV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
