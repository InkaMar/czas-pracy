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

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Buforowanie offline
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("Buforowanie niedostępne:", err.code);
});

// Główna logika po załadowaniu strony
window.addEventListener("DOMContentLoaded", () => {
  const btnCos = document.getElementById("zapisz-cos");
  const btnFirebase = document.getElementById("zapisz");

  if (btnCos) {
    btnCos.addEventListener("click", () => {
      alert("Kliknięto 'Zapisz coś'");
    });
  }

  if (btnFirebase) {
    btnFirebase.addEventListener("click", async () => {
      try {
        await setDoc(doc(db, "raporty", "pierwszy"), {
          tekst: "Zapisane dane",
          data: new Date().toISOString()
        });
        alert("Dane zapisane!");
      } catch (e) {
        console.error("Błąd zapisu do Firebase:", e);
        alert("Błąd zapisu!");
      }
    });
  }
});

// Rejestracja Service Workera
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker OK"))
    .catch((err) => console.error("Błąd SW:", err));
}
