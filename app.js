// Importy Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_Bf4R35Q6rT9QYwuF8rjXH7RiNujcy0E",
  authDomain: "moja-aplikacja-b5a6d.firebaseapp.com",
  projectId: "moja-aplikacja-b5a6d",
  storageBucket: "moja-aplikacja-b5a6d.appspot.com",
  messagingSenderId: "1007551436755",
  appId: "1:1007551436755:web:97dd153ac7fbc288e2c126",
  measurementId: "G-GPL7DD4H6Q"
};

// Inicjalizacja
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Buforowanie offline
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("Buforowanie niedostępne:", err.code);
});

// Funkcja zapisu
async function zapiszDane() {
  try {
    await setDoc(doc(db, "raporty", "pierwszy"), {
      tekst: "Zapisane dane",
      data: new Date().toISOString()
    });
    alert("Dane zapisane!");
  } catch (e) {
    console.error("Błąd zapisu:", e);
  }
}

// Obsługa kliknięcia
window.addEventListener("DOMContentLoaded", () => {
  const przycisk = document.getElementById("zapisz");
  if (przycisk) {
    przycisk.addEventListener("click", zapiszDane);
  }
});

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker OK"))
    .catch(console.error);
}
