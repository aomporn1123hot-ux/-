import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// 🔹 โปรเจกต์เก่า (ข้อมูลเดิมจะยังอยู่)
const firebaseConfigOld = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};

// 🔹 โปรเจกต์ใหม่ (จะเริ่มเก็บข้อมูลเพิ่มโดยไม่กระทบของเก่า)
const firebaseConfigNew = {
  apiKey: "AIzaSyAy88t3sZ_OEoQP0jRxVYKOLG1gucvRGsg",
  authDomain: "fera-ergonomics.firebaseapp.com",
  databaseURL: "https://fera-ergonomics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-ergonomics",
  storageBucket: "fera-ergonomics.firebasestorage.app",
  messagingSenderId: "111595993339",
  appId: "1:111595993339:web:80119030f63a850447985e",
  measurementId: "G-2T11CCPNY7"
};

// ✅ เชื่อมต่อทั้งสองโปรเจกต์
const appOld = initializeApp(firebaseConfigOld, "oldProject");
const appNew = initializeApp(firebaseConfigNew, "newProject");

// ✅ ดึง Database ของแต่ละโปรเจกต์
const dbOld = getDatabase(appOld);
const dbNew = getDatabase(appNew);

// ✅ ฟังก์ชันบันทึกข้อมูลไปทั้งสองโปรเจกต์
function saveToBothProjects(data) {
  try {
    const newRefOld = push(ref(dbOld, "responses"));
    const newRefNew = push(ref(dbNew, "responses"));
    set(newRefOld, data);
    set(newRefNew, data);
    console.log("✅ ข้อมูลถูกส่งไปทั้งสองโปรเจกต์แล้ว");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
  }
}

export { ref, set, push, saveToBothProjects };
