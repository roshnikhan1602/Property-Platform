import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDb1RXdSyUdE5H5ywqe2Y5WOXe9fNu8_7M",
  authDomain: "property-platform-c3914.firebaseapp.com",
  projectId: "property-platform-c3914",
  storageBucket: "property-platform-c3914.firebasestorage.app",
  messagingSenderId: "3827902034",
  appId: "1:3827902034:web:65bcce9babf0115b71e18b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);