document.addEventListener("DOMContentLoaded", () => {
  let pages = document.querySelectorAll(".page");
  let current = 0;
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
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

      // ถ้ามีโรค
      if (group === "disease") {
        if (opt.dataset.value === "มี") {
          document.getElementById("disease-detail").classList.remove("hidden");
        } else {
          document.getElementById("disease-detail").classList.add("hidden");
        }
      }

      // ถ้าเลือกงาน
      if (group === "worktype") {
        let container = document.getElementById("work-images");
        container.innerHTML = "";
        if (opt.dataset.value === "ทำนา") {
          container.innerHTML = `<img src="1.png" class="workimg">`;
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

        // ผูก event เลือกรูป
        document.querySelectorAll(".workimg").forEach(img => {
          img.addEventListener("click", () => {
            document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
            img.classList.add("selected");
          });
        });
      }
    });
  });
});
