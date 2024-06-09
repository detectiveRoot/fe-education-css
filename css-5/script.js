let menuBtn = document.querySelector('.menu-btn');
let navigationList = document.querySelector('.navigation-list');
let page = document.querySelector('.page');

menuBtn.onclick = function() {
    menuBtn.classList.toggle('menu-btn_active');
    navigationList.classList.toggle('navigation-list_active')
    page.classList.toggle('page_overlay')
}