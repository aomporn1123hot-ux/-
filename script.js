import { saveToBothProjects } from "./firebase.js";

let current = 0;
const pages = document.querySelectorAll(".page");

// ✅ แสดงหน้าปัจจุบัน
function showPage(n) {
  pages.forEach((page, i) => {
    page.style.display = i === n ? "block" : "none";
  });
  updateProgress(n);
  current = n;
}

// ✅ แถบความคืบหน้า
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

// ✅ ตัวเลือกแบบเลือกได้หนึ่งอันต่อกลุ่ม
document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const group = option.dataset.group;
    document.querySelectorAll(`.option[data-group='${group}']`).forEach(opt => {
      opt.classList.remove("selected");
    });
    option.classList.add("selected");

    // แสดงช่องโรคประจำตัวเพิ่มเติม
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

    // เปิดปุ่มส่งข้อมูล
    const submitBtn = option.closest(".page").querySelector(".submit");
    if (submitBtn) submitBtn.disabled = false;
  });
});

// ✅ ตรวจอินพุตตัวเลข: เปิดปุ่มเมื่อกรอกครบ
["age", "exp", "workhours"].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => {
      const nextBtn = input.closest(".page").querySelector(".next");
      nextBtn.disabled = input.value.trim() === "";
    });
  }
});

// ✅ แสดงภาพตามลักษณะงาน
const workImages = {
  "ทำนา": ["1.png"],
  "ทำไร่": ["2.png", "3.png", "4.png"],
  "ทำสวน": ["5.png", "6.png"]
};

document.querySelectorAll(".option[data-group='worktype']").forEach(opt => {
  opt.addEventListener("click", () => {
    const worktype = opt.dataset.value;
    const container = document.getElementById("work-images");
    container.innerHTML = ""; // ล้างภาพเก่าออกก่อน

    if (workImages[worktype]) {
      workImages[worktype].forEach(file => {
        const img = document.createElement("img");
        img.src = `./${file}`; // ✅ ไฟล์อยู่ในโฟลเดอร์เดียวกับ index.html
        img.alt = file;
        img.classList.add("workimg");
        img.style.border = "0.5mm solid lightgreen";
        img.style.width = "30%";
        img.style.margin = "5px";
        container.appendChild(img);

        // กดเลือกรูปงาน
        img.addEventListener("click", () => {
          document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
          img.classList.add("selected");
          const submitBtn = document.querySelector(".submit");
          submitBtn.disabled = false;
        });
      });
    }
  });
});

// ✅ เมื่อกดส่งข้อมูล
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

  // ✅ บันทึกไปยัง Firebase ทั้งสองโปรเจกต์
  saveToBothProjects(data);

  // แสดงหน้าสุดท้าย
  showPage(current + 1);
});

// ✅ หน้าแรกเริ่มต้น
showPage(0);
