// import {initMobileMenu} from "../assets/js/header.js"
const styles = `
/* MOBILE MENU OVERLAY & SIDEBAR */
.mobile-menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mobile-menu-overlay.active {
    display: block;
    opacity: 1;
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 320px;
    max-width: 85vw;
    height: 100vh;
    background: #efe0be;
    z-index: 999;
    transition: right 0.3s ease;
    overflow-y: auto;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
}

.mobile-menu.active {
    right: 0;
}

.mobile-menu-header {
    background: #e0d1a8;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}

.mobile-menu-header .mobile-menu-header__logo {
    font-size: 2rem;
    text-decoration: none;
    color: black;
    text-transform: uppercase;
    font-weight: bolder;
    font-family: var(--FF-HEADING);
}



.close-menu {
    background: transparent;
    border: 2px solid black;
    color: black;
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.close-menu:hover {
    background: black;
    color: white;
    transform: rotate(90deg);
}

.mobile-nav-links {
    list-style: none;
    padding: 20px 0;
}

.mobile-nav-links li a {
    display: block;
    color: black;
    text-decoration: none;
    padding: 15px 25px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-links li a:hover {
    background: #e0d1a8;
    padding-left: 35px;
}

.mobile-nav-links li a.active {
    background: var(--LINK-ACTIVE-COLOR);
    color: white;
}

.mobile-menu-footer {
    padding: 20px;
    border-top: 2px solid black;
    background: #e0d1a8;
}

.mobile-menu-footer-item {
    border: 2px solid black;
    background: white;
    padding: 12px 20px;
    border-radius: 25px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s;
}

.mobile-menu-footer-item:hover {
    background: black;
    color: white;
    transform: translateY(-2px);
}




`;

function injectStyle() {
  if (document.getElementById("mobile-menu-style")) return;

  const style = document.createElement("style");
  style.id = "mobile-menu-style";
  style.textContent = styles;
  document.head.appendChild(style);
}
function createMobileMenu() {
  injectStyle();
  return `
    <!-- Mobile Menu Overlay -->
    <div
      class="mobile-menu-overlay"
      onclick="toggleMenu(); return false;"
    ></div>

    <!-- Mobile Menu Sidebar -->
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <p class="mobile-menu-header__logo">Aurews</p>
        <button
          class="close-menu"
          onclick="toggleMenu()"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="#" class="active">Home</a></li>
        <li><a href="#">Latest</a></li>
        <li><a href="#">Business News</a></li>
        <li><a href="#">Money & Markets</a></li>
        <li><a href="#">Tech & Innovation</a></li>
        <li><a href="#">A.I.</a></li>
        <li><a href="#">Lifestyle</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Email</a></li>
        <li><a href="#">Podcast</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="mobile-menu-footer">
        <div
          id="login-button"
          class="mobile-menu-footer-item"
          onclick="openPopup('login')"
        >
          Login
        </div>
        <div class="mobile-menu-footer-item">Languages</div>
        <div class="mobile-menu-footer-item js-search">Search</div>
        <div class="mobile-menu-footer-item">Newsletter</div>
        <div class="mobile-menu-footer-item js-about">About</div>
      </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("mobile-menu__placeholder");
  if (container) {
    container.innerHTML = createMobileMenu();
    userLoginHTML();
    clickAddPostButton();
    toggleMobileNav();
    // initMobileMenu();
    const jsSearchEl = document.querySelector(".js-search");
    if (jsSearchEl) {
      jsSearchEl.addEventListener("click", () => {
        window.location.href = "./Search.html";
      });
    }

    const jsAboutEl = document.querySelector(".js-about");
    if (jsAboutEl) {
      jsAboutEl.addEventListener("click", () => {
        window.location.href = "./about.html";
      });
    }
  }
});
