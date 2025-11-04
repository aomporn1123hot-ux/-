// ===============================
// ฟังก์ชันแสดงหน้าปัจจุบัน
// ===============================
let currentPage = 1;
const pages = document.querySelectorAll(".page");

function showPage(num) {
  pages.forEach((p, i) => {
    p.style.display = i + 1 === num ? "block" : "none";
  });

  // ปรับแถบความคืบหน้า
  const progress = ((num - 1) / (pages.length - 1)) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressSeed").style.left = progress + "%";
}

// เริ่มต้นหน้าแรก
showPage(currentPage);

// ===============================
// ปุ่ม "ถัดไป" และ "ย้อนกลับ"
// ===============================
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentPage < pages.length) {
      currentPage++;
      showPage(currentPage);
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });
});

// ===============================
// ตัวเลือก (option)
// ===============================
document.querySelectorAll(".option").forEach(opt => {
  opt.addEventListener("click", () => {
    const group = opt.dataset.group;
    const value = opt.dataset.value;

    // ล้างการเลือกก่อนหน้า
    document.querySelectorAll(`[data-group="${group}"]`).forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");

    // ถ้าเป็นโรคประจำตัว
    if (group === "disease") {
      const diseaseDetail = document.getElementById("disease-detail");
      if (value === "มี") {
        diseaseDetail.classList.remove("hidden");
      } else {
        diseaseDetail.classList.add("hidden");
      }
    }

    // ถ้าเป็นลักษณะงาน
    if (group === "worktype") {
      const gallery = document.getElementById("work-images");
      let images = [];

      if (value === "ทำนา") images = ["1.png"];
      else if (value === "ทำไร่") images = ["2.png", "3.png", "4.png"];
      else if (value === "ทำสวน") images = ["5.png", "6.png"];

      gallery.innerHTML = images
        .map(img => `<img src="${img}" alt="${value}" class="work-img">`)
        .join("");
    }

    // เปิดปุ่มถัดไปหรือส่ง
    const parentPage = opt.closest(".page");
    const nextBtn = parentPage.querySelector(".next, .submit");
    if (nextBtn) nextBtn.disabled = false;
  });
});

// ===============================
// การกรอกตัวเลข (input)
// ===============================
["age", "exp", "workhours"].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("input", () => {
    const nextBtn = input.closest(".page").querySelector(".next");
    if (nextBtn) nextBtn.disabled = input.value.trim() === "";
  });
});

// ===============================
// เมื่อกด "ส่ง" (จบแบบสอบถาม)
// ===============================
document.querySelector(".submit").addEventListener("click", () => {
  currentPage++;
  showPage(currentPage);
});

// ===============================
// ปุ่มไปหน้าประเมิน FERA
// ===============================
document.getElementById("feraBtn")?.addEventListener("click", () => {
  window.location.href = "https://aomporn1123hot-ux.github.io/FERA-for-Farmer/";
});
