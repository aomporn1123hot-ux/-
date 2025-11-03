import { db, ref, set, push, saveToBothProjects } from "./firebase.js";

let current = 0;
const pages = document.querySelectorAll(".page");
showPage(current);

// ฟังก์ชันเปลี่ยนหน้า
function showPage(n) {
  pages.forEach((page, i) => {
    page.style.display = i === n ? "block" : "none";
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ปุ่มถัดไป
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current < pages.length - 1) {
      current++;
      showPage(current);
    }
  });
});

// ปุ่มย้อนกลับ
document.querySelectorAll(".back").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showPage(current);
    }
  });
});

// ตัวเลือกปุ่มภาพหรือข้อความ
document.querySelectorAll(".option").forEach(opt => {
  opt.addEventListener("click", () => {
    const group = opt.dataset.group;
    document.querySelectorAll(`.option[data-group='${group}']`).forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");
  });
});

// ตัวเลือกภาพท่าทาง
document.querySelectorAll(".workimg").forEach(img => {
  img.addEventListener("click", () => {
    document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
  });
});

// ฟังก์ชันส่งข้อมูลไป Firebase ทั้งสองโปรเจกต์
document.querySelector(".submit").addEventListener("click", () => {
  const gender = document.querySelector(".option[data-group='gender'].selected")?.dataset.value || "";
  const age = document.getElementById("age")?.value || "";
  const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
  const disease = diseaseOpt ? diseaseOpt.dataset.value : "";
  const diseaseText = disease === "มี" ? document.getElementById("disease-text")?.value || "" : "";
  const exp = document.getElementById("exp")?.value || "";
  const workhours = document.getElementById("workhours")?.value || "";
  const worktype = document.querySelector(".option[data-group='worktype'].selected")?.dataset.value || "";
  const workimg = document.querySelector(".workimg.selected")?.src || "";

  const data = {
    gender,
    age,
    disease,
    diseaseText,
    exp,
    workhours,
    worktype,
    workimg,
    timestamp: new Date().toISOString()
  };

  // ✅ ส่งข้อมูลไป Firebase ทั้งสองโปรเจกต์
  saveToBothProjects(data);

  alert("ส่งข้อมูลเรียบร้อย ✅");
  showPage(current + 1);
});
