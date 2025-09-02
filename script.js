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
    validatePage();
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
      case 0:
        valid = !!document.querySelector(".option[data-group='gender'].selected");
        break;
      case 1:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 2:
        let diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
        if (diseaseOpt) {
          if (diseaseOpt.dataset.value === "มี") {
            valid = !!document.getElementById("disease-text").value;
          } else valid = true;
        }
        break;
      case 3:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 4:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 5:
        let workOpt = document.querySelector(".option[data-group='worktype'].selected");
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
        document.getElementById("disease-detail")
          .classList.toggle("hidden", opt.dataset.value !== "มี");
      }

      if (group === "worktype") {
        let container = document.getElementById("work-images");
        container.innerHTML = "";
        if (opt.dataset.value === "ทำนา") {
          container.innerHTML = `<img src="1.png" class="workimg" style="pointer-events:none;">`;
        } else if (opt.dataset.value === "ทำไร่") {
          container.innerHTML = `<img src="2.png" class="workimg"><img src="3.png" class="workimg"><img src="4.png" class="workimg">`;
        } else if (opt.dataset.value === "ทำสวน") {
          container.innerHTML = `<img src="5.png" class="workimg"><img src="6.png" class="workimg">`;
        }

        document.querySelectorAll(".workimg").forEach(img => {
          img.style.animation = "none";
          img.offsetHeight; // trigger reflow
          img.style.animation = null;
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

  document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => showPage(current + 1)));
  document.querySelectorAll(".prev").forEach(btn => btn.addEventListener("click", () => showPage(current - 1)));
  document.querySelector(".submit").addEventListener("click", () => showPage(current + 1));
  document.getElementById("exitBtn").addEventListener("click", () => { window.open("", "_self"); window.close(); });

  updateProgress();
  validatePage();
});
