import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Добавлен импорт объекта auth
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl8mpFOI-JDOZNAhN2EDGRVSuM61VhX4Y",
  authDomain: "telwebkg.firebaseapp.com",
  projectId: "telwebkg",
  storageBucket: "telwebkg.appspot.com",
  messagingSenderId: "165291369181",
  appId: "1:165291369181:web:881b2f5c120d0331673134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Access Firestore inside the initialization
const auth = getAuth(app); // Инициализируем объект auth

// Функция build
const build = () => {
  console.log("Приложение успешно построено с использованием конфигурации Firebase!");
};

// Вызываем функцию build
build();

export { firebaseConfig, db, auth }; // Экспортируем объект auth вместе с db и firebaseConfig
