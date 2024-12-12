import { initializeApp } from "firebase/app";

export const fireBaseCredential = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC-7Cr1dBRR7S9B5INhLGeLQ5Zgziy9MlI",
    authDomain: "otp-service-519f6.firebaseapp.com",
    projectId: "otp-service-519f6",
    storageBucket: "otp-service-519f6.appspot.com",
    messagingSenderId: "558624776219",
    appId: "1:558624776219:web:bc757e476e03e28254d8be",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
};
