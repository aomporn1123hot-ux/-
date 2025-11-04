import { ref, set, push, saveToBothProjects } from "./firebase.js";

let current = 0;
const pages = document.querySelectorAll(".page");

// ✅ ฟังก์ชันแสดงหน้าปัจจุบัน
function showPage(n) {
  pages.forEach((page, i) => {
    page.style.display = i === n ? "block" : "none";
  });
  updateProgress(n);
  current = n;
}

// ✅ อัปเดตแถบความคืบหน้า
function updateProgress(n) {
  const fill = document.getElementById("progressFill");
  const seed = document.getElementById("progressSeed");
  const progress = ((n + 1) / pages.length) * 100;
  fill.style.width = `${progress}%`;
  seed.style.left = `${progress}%`;
}

// ✅ ปุ่ม “ถัดไป”
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current < pages.length - 1) showPage(current + 1);
  });
});

// ✅ ปุ่ม “ย้อนกลับ”
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

    // ✅ แสดงช่องกรอก "โรคประจำตัว" เมื่อเลือก "มี"
    if (group === "disease") {
      const detail = document.getElementById("disease-detail");
      if (option.dataset.value === "มี") {
        detail.classList.remove("hidden");
      } else {
        detail.classList.add("hidden");
      }
    }

    // ✅ แสดงภาพลักษณะงานเมื่อเลือกประเภทงาน
    if (group === "worktype") {
      const type = option.dataset.value;
      const container = document.getElementById("work-images");
      container.innerHTML = ""; // เคลียร์ภาพเก่า

      const workImages = {
        "ทำนา": ["images/1.png"],
        "ทำไร่": ["images/2.png", "images/3.png", "images/4.png"],
        "ทำสวน": ["images/5.png", "images/6.png"]
      };

      if (workImages[type]) {
        workImages[type].forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.classList.add("workimg");
          container.appendChild(img);
        });
      }

      // ✅ เมื่อคลิกภาพ ให้เลือกได้ภาพเดียว
      document.querySelectorAll(".workimg").forEach(img => {
        img.addEventListener("click", () => {
          document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
          img.classList.add("selected");

          const submitBtn = document.querySelector(".submit");
          if (submitBtn) submitBtn.disabled = false;
        });
      });
    }

    // ✅ เปิดปุ่มถัดไป
    const nextBtn = option.closest(".page").querySelector(".next");
    if (nextBtn) nextBtn.disabled = false;

    // ✅ เปิดปุ่มส่ง (ถ้ามี)
    const submitBtn = option.closest(".page").querySelector(".submit");
    if (submitBtn) submitBtn.disabled = false;
  });
});

// ✅ ตรวจสอบการกรอกตัวเลข: เปิดปุ่มถัดไปเมื่อมีข้อมูล
["age", "exp", "workhours"].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => {
      const nextBtn = input.closest(".page").querySelector(".next");
      nextBtn.disabled = input.value.trim() === "";
    });
  }
});

// ✅ เมื่อกดปุ่มส่ง
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

  // ✅ ไปยังหน้าสุดท้าย
  showPage(current + 1);
});

// ✅ เริ่มต้นที่หน้าแรก
showPage(0);
