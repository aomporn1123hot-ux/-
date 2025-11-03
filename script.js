import { ref, set, push, saveToBothProjects } from "./firebase.js";

let current = 0;
const pages = document.querySelectorAll(".page");

// แสดงหน้าปัจจุบัน
function showPage(n) {
  pages.forEach((page, i) => {
    page.style.display = i === n ? "block" : "none";
  });
  updateProgress(n);
  current = n;
}

// อัปเดตแถบความคืบหน้า
function updateProgress(n) {
  const fill = document.getElementById("progressFill");
  const seed = document.getElementById("progressSeed");
  const progress = ((n + 1) / pages.length) * 100;
  fill.style.width = `${progress}%`;
  seed.style.left = `${progress}%`;
}

// ปุ่ม “ถัดไป” ทุกหน้า
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current < pages.length - 1) showPage(current + 1);
  });
});

// ปุ่ม “ย้อนกลับ”
document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) showPage(current - 1);
  });
});

// ✅ เมื่อคลิกตัวเลือก ให้เลือกเฉพาะอันเดียวต่อกลุ่ม
document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const group = option.dataset.group;
    document
      .querySelectorAll(`.option[data-group='${group}']`)
      .forEach(opt => opt.classList.remove("selected"));
    option.classList.add("selected");

    // กรณีโรคประจำตัว — แสดงช่องกรอกเพิ่มเติม
    if (group === "disease") {
      const detail = document.getElementById("disease-detail");
      if (option.dataset.value === "มี") {
        detail.classList.remove("hidden");
      } else {
        detail.classList.add("hidden");
      }
    }

    // เปิดปุ่มถัดไป
    const nextBtn = option.closest(".page").querySelector(".next");
    if (nextBtn) nextBtn.disabled = false;

    // เปิดปุ่มส่งกรณีเป็นหน้าสุดท้าย
    const submitBtn = option.closest(".page").querySelector(".submit");
    if (submitBtn) submitBtn.disabled = false;
  });
});

// ✅ ตรวจอินพุตตัวเลข: เปิดปุ่มถัดไปเมื่อกรอกครบ
["age", "exp", "workhours"].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => {
      const nextBtn = input.closest(".page").querySelector(".next");
      nextBtn.disabled = input.value.trim() === "";
    });
  }
});

// ✅ บันทึกข้อมูลเมื่อกดส่ง
document.querySelector(".submit").addEventListener("click", () => {
  const gender = document.querySelector(".option[data-group='gender'].selected")?.dataset.value || "";
  const age = document.getElementById("age")?.value || "";
  const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
  const disease = diseaseOpt ? diseaseOpt.dataset.value : "";
  const diseaseText = disease === "มี" ? document.getElementById("disease-text")?.value : "";
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

  // ✅ ส่งข้อมูลไป Firebase ทั้งสองโปรเจกต์ (โดยไม่กระทบข้อมูลเดิม)
  saveToBothProjects(data);

  // ไปยังหน้าสุดท้าย
  showPage(current + 1);
});

// ✅ หน้าแรกเริ่มต้น
showPage(0);
