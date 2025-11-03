// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

/* -------------------------- โปรเจกต์เก่า -------------------------- */
const firebaseConfigOld = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};

/* -------------------------- โปรเจกต์ใหม่ -------------------------- */
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

/* ---------------------- Initialize ทั้งสองโปรเจกต์ ---------------------- */
const appOld = initializeApp(firebaseConfigOld, "oldApp");
const appNew = initializeApp(firebaseConfigNew, "newApp");

/* ---------------------- เชื่อมฐานข้อมูลทั้งคู่ ---------------------- */
const dbOld = getDatabase(appOld);
const dbNew = getDatabase(appNew);

/* ---------------------- ฟังก์ชันบันทึกข้อมูลพร้อมกัน ---------------------- */
function saveToBothProjects(data) {
  try {
    // บันทึกไปโปรเจกต์เก่า
    const newRefOld = push(ref(dbOld, "responses"));
    set(newRefOld, data);

    // บันทึกไปโปรเจกต์ใหม่
    const newRefNew = push(ref(dbNew, "responses"));
    set(newRefNew, data);

    console.log("✅ ส่งข้อมูลสำเร็จไปทั้งสองโปรเจกต์");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
  }
}

/* ---------------------- ส่งออกให้ script.js ใช้ ---------------------- */
export { dbOld as db, ref, set, push, saveToBothProjects };
