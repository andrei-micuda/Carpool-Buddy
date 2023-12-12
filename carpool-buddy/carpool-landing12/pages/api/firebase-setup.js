import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyD7X_4EHzQcjcOTAeGvbbEgB4QZsmCusIw",
  authDomain: "carpool-buddy-86e69.firebaseapp.com",
  projectId: "carpool-buddy-86e69",
  storageBucket: "carpool-buddy-86e69.appspot.com",
  messagingSenderId: "98136266175",
  appId: "1:98136266175:web:a15cf2292200165626bd0a",
  measurementId: "G-M5TGLE0TN6",
  storageBucket: "gs://carpool-buddy-86e69.appspot.com",
  databaseURL:
    "https://carpool-buddy-86e69-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export function uploadEmail(email) {
  set(ref(database, "emails/" + uuidv4()), {
    email: email,
  });
}
