// Importa funções básicas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANeLIoBBSG7tlgpJ0XBcdklwHU2Ax89iA",
  authDomain: "protocolo-nexvision.firebaseapp.com",
  projectId: "protocolo-nexvision",
  storageBucket: "protocolo-nexvision.firebasestorage.app",
  messagingSenderId: "584379334470",
  appId: "1:584379334470:web:84c8523063dac4f754ef47",
  measurementId: "G-RFTBVVTWBG"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta o Firestore para ser usado em outros arquivos JS
export { db };
