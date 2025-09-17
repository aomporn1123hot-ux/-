import { db, ref, set, push } from "./firebase.js";

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
    seed.textContent = current === 0 ? "🌱" : current < totalSteps - 2 ? "🌿" : "🌳";
  }

  function validatePage() {
    let nextBtn = pages[current].querySelector(".next, .submit");
    if (!nextBtn) return;
    let valid = false;
    switch (current) {
      case 0: valid = !!document.querySelector(".option[data-group='gender'].selected"); break;
      case 1: valid = !!pages[current].querySelector("input").value; break;
      case 2:
        let diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
        valid = diseaseOpt ? (diseaseOpt.dataset.value === "มี" ? !!document.getElementById("disease-text").value : true) : false;
        break;
      case 3: valid = !!pages[current].querySelector("input").value; break;
      case 4: valid = !!pages[current].querySelector("input").value; break;
      case 5:
        let workOpt = document.querySelector(".option[data-group='worktype'].selected");
        valid = workOpt ? (workOpt.dataset.value === "ทำนา" ? true : !!document.querySelector(".workimg.selected")) : false;
        break;
      default: valid = true;
    }
    nextBtn.disabled = !valid;
  }

  document.querySelectorAll("input").forEach(inp => inp.addEventListener("input", validatePage));
  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      let group = opt.dataset.group;
      document.querySelectorAll(`.option[data-group="${group}"]`).forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      if (group === "disease") document.getElementById("disease-detail").classList.toggle("hidden", opt.dataset.value !== "มี");
      validatePage();
    });
  });

  document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => showPage(current + 1)));
  document.querySelectorAll(".prev").forEach(btn => btn.addEventListener("click", () => showPage(current - 1)));

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

    const data = { gender, age, disease, diseaseText, exp, workhours, worktype, timestamp: new Date().toISOString() };

    const newRef = push(ref(db, "responses"));
    set(newRef, data).then(() => showPage(current + 1)).catch(err => alert("บันทึกข้อมูลไม่สำเร็จ"));
  });

  document.getElementById("exitBtn").addEventListener("click", () => { window.open("", "_self"); window.close(); });

  updateProgress();
  validatePage();
});
