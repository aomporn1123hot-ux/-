// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// ----- โปรเจกต์เก่า -----
const oldConfig = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};
const oldApp = initializeApp(oldConfig, "oldApp");
const oldDB = getDatabase(oldApp);

// ----- โปรเจกต์ใหม่ -----
const newConfig = {
  apiKey: "AIzaSyBbWzOxGQa7OKb6hXWvx2o4ZcimTqWqtg4",
  authDomain: "aumporn-03.firebaseapp.com",
  databaseURL: "https://aumporn-03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aumporn-03",
  storageBucket: "aumporn-03.firebasestorage.app",
  messagingSenderId: "960384618927",
  appId: "1:960384618927:web:cd333e03026bb56f2f1f5a",
  measurementId: "G-YYKZVQS3NX"
};
const newApp = initializeApp(newConfig, "newApp");
const newDB = getDatabase(newApp);

export { oldDB, newDB, ref, set, push };
