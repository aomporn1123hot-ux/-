// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// ================== โปรเจกต์เก่า ==================
const firebaseConfigOld = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};
const appOld = initializeApp(firebaseConfigOld, "oldApp");
const dbOld = getDatabase(appOld);

// ================== โปรเจกต์ใหม่ ==================
const firebaseConfigNew = {
  apiKey: "AIzaSyBbWzOxGQa7OKb6hXWvx2o4ZcimTqWqtg4",
  authDomain: "aumporn-03.firebaseapp.com",
  databaseURL: "https://aumporn-03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aumporn-03",
  storageBucket: "aumporn-03.appspot.com",
  messagingSenderId: "960384618927",
  appId: "1:960384618927:web:cd333e03026bb56f2f1f5a",
  measurementId: "G-YYKZVQS3NX"
};
const appNew = initializeApp(firebaseConfigNew, "newApp");
const dbNew = getDatabase(appNew);

// ================== ฟังก์ชันส่งข้อมูลไปทั้งสอง ==================
function sendDataToBoth(path, data) {
  // ส่งไปโปรเจกต์เก่า
  set(ref(dbOld, path), data)
    .then(() => console.log("Data sent to old project successfully"))
    .catch((error) => console.error("Error sending to old project:", error));
  
  // ส่งไปโปรเจกต์ใหม่
  set(ref(dbNew, path), data)
    .then(() => console.log("Data sent to new project successfully"))
    .catch((error) => console.error("Error sending to new project:", error));
}

// ================== ฟังก์ชัน push ข้อมูลใหม่ ==================
function pushDataToBoth(path, data) {
  push(ref(dbOld, path), data)
    .then(() => console.log("Data pushed to old project successfully"))
    .catch((error) => console.error("Error pushing to old project:", error));

  push(ref(dbNew, path), data)
    .then(() => console.log("Data pushed to new project successfully"))
    .catch((error) => console.error("Error pushing to new project:", error));
}

// Export
export { dbOld, dbNew, sendDataToBoth, pushDataToBoth };
