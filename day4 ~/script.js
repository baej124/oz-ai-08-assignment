
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => menu.classList.remove("open"))
);


const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});


const lightbox = document.querySelector(".lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});
const closeLightbox = () => lightbox.classList.remove("open");
lightbox.addEventListener("click", e => {
  if (e.target !== lbImg) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".section").forEach(sec => {
  sec.classList.add("reveal");
  observer.observe(sec);
});