document.addEventListener("DOMContentLoaded", () => {
  let pages = document.querySelectorAll(".page");
  let current = 0;
  const totalSteps = pages.length - 1; // ไม่รวมหน้าสุดท้าย (video)
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
    updateProgress();
  }

  function updateProgress() {
    let percent = (current / (totalSteps - 1)) * 100;
    let seed = document.getElementById("progressSeed");
    seed.style.left = percent + "%";

    // เปลี่ยนอีโมจิต้นไม้ตามความก้าวหน้า
    if (current === 0) seed.textContent = "🌱";
    else if (current < totalSteps - 2) seed.textContent = "🌿";
    else seed.textContent = "🌳";
  }

  document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => showPage(current + 1));
  });

  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", () => showPage(current - 1));
  });

  document.querySelector(".submit").addEventListener("click", () => {
    showPage(current + 1);
  });

  // เลือก option
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
            });
          }
        });
      }
    });
  });

  // ปุ่มออก
  document.getElementById("exitBtn").addEventListener("click", () => {
    window.open("", "_self");
    window.close();
  });

  updateProgress();
});
