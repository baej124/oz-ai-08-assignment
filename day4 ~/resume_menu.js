// 태블릿·모바일에서 햄버거 버튼으로 사이드바 메뉴 열고 닫기
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".menu-toggle");
const toggleIcon = toggleBtn.querySelector("i");

function setMenu(open) {
    sidebar.classList.toggle("open", open);
    toggleBtn.setAttribute("aria-expanded", open);
    toggleIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

// 버튼 누르면 열기/닫기
toggleBtn.addEventListener("click", () => {
    setMenu(!sidebar.classList.contains("open"));
});

// 메뉴 항목을 누르면 자동으로 닫기
sidebar.querySelectorAll(".sidebar-menu a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

// 메뉴 바깥을 누르면 닫기
document.addEventListener("click", e => {
    if (!sidebar.contains(e.target)) setMenu(false);
});

// 화면을 PC 크기로 넓히면 열린 상태 초기화
window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) setMenu(false);
});