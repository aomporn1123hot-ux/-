document.addEventListener("DOMContentLoaded", () => {
  let pages = document.querySelectorAll(".page");
  let current = 0;
  const totalSteps = pages.length - 1; 
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
    updateProgress();
    validatePage(); // ตรวจทุกครั้งที่เปลี่ยนหน้า
  }

  function updateProgress() {
    let percent = (current / (totalSteps - 1)) * 100;
    let seed = document.getElementById("progressSeed");
    let fill = document.getElementById("progressFill");

    seed.style.left = percent + "%";
    fill.style.width = percent + "%";

    if (current === 0) seed.textContent = "🌱";
    else if (current < totalSteps - 2) seed.textContent = "🌿";
    else seed.textContent = "🌳";
  }

  function validatePage() {
    let nextBtn = pages[current].querySelector(".next, .submit");
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
        let diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
        if (diseaseOpt) {
          if (diseaseOpt.dataset.value === "มี") {
            valid = !!document.getElementById("disease-detail").value;
          } else {
            valid = true;
          }
        }
        break;
      case 3: // ประสบการณ์
        valid = !!pages[current].querySelector("input").value;
        break;
      case 4: // ระยะเวลาทำงาน
        valid = !!pages[current].querySelector("input").value;
        break;
      case 5: // ลักษณะงาน
        let workOpt = document.querySelector(".option[data-group='worktype'].selected");
        if (workOpt) {
          if (workOpt.dataset.value === "ทำนา") {
            valid = true;
          } else {
            valid = !!document.querySelector(".workimg.selected");
          }
        }
        break;
      default:
        valid = true;
    }

    nextBtn.disabled = !valid;
  }

  // ตรวจ input พิมพ์
  document.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("input", validatePage);
  });

  // ตรวจ option เลือก
  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      let group = opt.dataset.group;
      document.querySelectorAll(`.option[data-group="${group}"]`)
        .forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      if (group === "disease") {
        if (opt.dataset.value === "มี") {
          document.getElementById("disease-detail").classList.remove("hidden");
        } else {
          document.getElementById("disease-detail").classList.add("hidden");
        }
      }

      if (group === "worktype") {
        let container = document.getElementById("work-images");
        container.innerHTML = "";
        if (opt.dataset.value === "ทำนา") {
          container.innerHTML = `<img src="1.png" class="workimg" style="pointer-events:none;">`;
        } else if (opt.dataset.value === "ทำไร่") {
          container.innerHTML = `
            <div class="options">
              <img src="2.png" class="workimg">
              <img src="3.png" class="workimg">
              <img src="4.png" class="workimg">
            </div>`;
        } else if (opt.dataset.value === "ทำสวน") {
          container.innerHTML = `
            <div class="options">
              <img src="5.png" class="workimg">
              <img src="6.png" class="workimg">
            </div>`;
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

  document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => showPage(current + 1));
  });

  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", () => showPage(current - 1));
  });

  document.querySelector(".submit").addEventListener("click", () => {
    showPage(current + 1);
  });

  document.getElementById("exitBtn").addEventListener("click", () => {
    window.open("", "_self");
    window.close();
  });

  updateProgress();
  validatePage();
});
