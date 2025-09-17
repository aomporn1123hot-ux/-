// script.js
import { db, ref, set, push } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  let current = 0;
  const totalSteps = pages.length - 1;
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
    updateProgress();
    validatePage();
  }

  function updateProgress() {
    const percent = (current / (totalSteps - 1)) * 100;
    const seed = document.getElementById("progressSeed");
    const fill = document.getElementById("progressFill");

    seed.style.left = percent + "%";
    fill.style.width = percent + "%";

    if (current === 0) seed.textContent = "🌱";
    else if (current < totalSteps - 2) seed.textContent = "🌿";
    else seed.textContent = "🌳";
  }

  function validatePage() {
    const nextBtn = pages[current].querySelector(".next, .submit");
    if (!nextBtn) return;

    let valid = false;
    switch (current) {
      case 0: // เพศ
        valid = !!document.querySelector(".option[data-group='gender'].selected");
        break;
      case 1: // อายุ
        valid = !!pages[current].querySelector("input").value;
        break;
      case 2: // โรคประจำตัว
        const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
        if (diseaseOpt) {
          valid = diseaseOpt.dataset.value === "มี" ? !!document.getElementById("disease-text").value : true;
        }
        break;
      case 3: // ประสบการณ์
        valid = !!pages[current].querySelector("input").value;
        break;
      case 4: // ชั่วโมงทำงาน
        valid = !!pages[current].querySelector("input").value;
        break;
      case 5: // ลักษณะงาน
        const workOpt = document.querySelector(".option[data-group='worktype'].selected");
        if (workOpt) {
          if (workOpt.dataset.value === "ทำนา") valid = true;
          else valid = !!document.querySelector(".workimg.selected");
        }
        break;
      default:
        valid = true;
    }
    nextBtn.disabled = !valid;
  }

  // ตรวจ input พิมพ์
  document.querySelectorAll("input").forEach(inp => inp.addEventListener("input", validatePage));

  // ตรวจ option เลือก
  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const group = opt.dataset.group;
      document.querySelectorAll(`.option[data-group="${group}"]`).forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      // โรคประจำตัว
      if (group === "disease") {
        document.getElementById("disease-detail").classList.toggle("hidden", opt.dataset.value !== "มี");
      }

      // ลักษณะงาน
      if (group === "worktype") {
        const container = document.getElementById("work-images");
        container.innerHTML = "";

        if (opt.dataset.value === "ทำนา") {
          container.innerHTML = `<img src="1.png" class="workimg" style="pointer-events:none;">`;
        } else if (opt.dataset.value === "ทำไร่") {
          container.innerHTML = `<img src="2.png" class="workimg"><img src="3.png" class="workimg"><img src="4.png" class="workimg">`;
        } else if (opt.dataset.value === "ทำสวน") {
          container.innerHTML = `<img src="5.png" class="workimg"><img src="6.png" class="workimg">`;
        }

        document.querySelectorAll(".workimg").forEach(img => {
          if (opt.dataset.value !== "ทำนา") {
            img.addEventListener("click", () => {
              document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
              img.classList.add("selected");
              validatePage();
            });
          }
        });
      }

      validatePage();
    });
  });

  // ปุ่มนำทาง
  document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => showPage(current + 1)));
  document.querySelectorAll(".prev").forEach(btn => btn.addEventListener("click", () => showPage(current - 1)));

  // ปุ่มส่ง → บันทึก Firebase
  document.querySelector(".submit").addEventListener("click", () => {
    console.log("ปุ่มส่งถูกกดแล้ว ✅");

    const gender = document.querySelector(".option[data-group='gender'].selected")?.dataset.value || "";
    const age = document.getElementById("age").value || "";
    const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
    const disease = diseaseOpt ? diseaseOpt.dataset.value : "";
    const diseaseText = disease === "มี" ? document.getElementById("disease-text").value : "";
    const exp = document.getElementById("exp").value || "";
    const workhours = document.getElementById("workhours").value || "";
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

    const newRef = push(ref(db, "responses"));
    set(newRef, data)
      .then(() => {
        console.log("บันทึกสำเร็จ ✅", data);
        showPage(current + 1);
      })
      .catch(err => {
        console.error("เกิดข้อผิดพลาด ❌", err);
        alert("บันทึกข้อมูลไม่สำเร็จ");
      });
  });

  // ปุ่มออก
  const exitBtn = document.getElementById("exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      window.open("", "_self");
      window.close();
    });
  }

  updateProgress();
  validatePage();
});
