import { initNavbar } from "../components/Navbar.js";
import { initAuthenOverlay } from "../components/AuthenOverlay.js";
import { initMobileMenuLayout } from "../components/MobileMenu.js";

/* -----------------------------------------------------
   TYPE MAPPING
----------------------------------------------------- */

const typeMapping = {
  Home: null,
  Latest: "Latest",
  "Business News": "Business News",
  "Money & Markets": "Money and Markets",
  "Money and Markets": "Money and Markets",
  "Tech & Innovation": "Tech and Innovation",
  "Tech and Innovation": "Tech and Innovation",
  "A.I.": "A.I.",
  Lifestyle: "Lifestyle",
  Politics: "Politics",
  Email: "Email",
  Podcast: "Podcast",
  Contact: null,
};

/* -----------------------------------------------------
   INSERT COMPONENTS
----------------------------------------------------- */

function insertNavbar() {
  const el = document.getElementById("navbar-placeholder");
  if (el) el.innerHTML = initNavbar();
}

function insertAuthenOverlay() {
  const el = document.getElementById("authen-overlay-placeholder");
  if (el) el.innerHTML = initAuthenOverlay();
}

/* -----------------------------------------------------
   MOBILE MENU TOGGLE
----------------------------------------------------- */

function toggleMenu() {
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const body = document.body;

  if (!menu || !overlay) return;

  const isOpen = menu.classList.toggle("active");
  overlay.classList.toggle("active");

  body.style.overflow = isOpen ? "hidden" : "";
}

window.toggleMenu = toggleMenu;

/* -----------------------------------------------------
   MOBILE NAVIGATION
----------------------------------------------------- */

function initMobileMenuLinks() {
  const links = document.querySelectorAll(".mobile-nav-links a");
  if (links.length === 0) return;

  links.forEach((link) => {
    const text = link.textContent.trim();
    const href = link.getAttribute("href");

    if (!href || href === "#" || href === "") {
      if (text === "Home") link.href = "./Index.html";
      else if (text === "Contact") link.href = "./Contact.html";
      else {
        const type = typeMapping[text];
        if (type)
          link.href = `./Category.html?type=${encodeURIComponent(type)}`;
      }
    }
  });
}

function toggleMobileNav() {
  const links = document.querySelectorAll(".mobile-nav-links a");
  if (links.length === 0) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  const path = window.location.pathname.toLowerCase();

  links.forEach((link) => link.classList.remove("active"));

  // Home
  if (
    path.endsWith("index.html") ||
    path.endsWith("/") ||
    (!path.includes("category") &&
      !path.includes("post") &&
      !path.includes("contact"))
  ) {
    const home = Array.from(links).find((a) => a.textContent.trim() === "Home");
    if (home) home.classList.add("active");
    return;
  }

  // Category
  if (type) {
    links.forEach((link) => {
      const text = link.textContent.trim();
      if (typeMapping[text] === type) link.classList.add("active");
    });
  }

  // Contact
  if (path.includes("contact")) {
    const c = Array.from(links).find((a) => a.textContent.trim() === "Contact");
    if (c) c.classList.add("active");
  }
}

function initMobileMenu() {
  function insertMobileMenu() {
    const el = document.getElementById("mobile-menu-placeholder");
    if (el) el.innerHTML = initMobileMenuLayout();
  }
  insertMobileMenu();
  initMobileMenuLinks();
  toggleMobileNav();

  document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("#")) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const menu = document.querySelector(".mobile-menu");
      if (menu && menu.classList.contains("active")) toggleMenu();

      window.location.href = href;
    });
  });
}

/* -----------------------------------------------------
   SEARCH + ABOUT BUTTONS
----------------------------------------------------- */

function initExtraButtons() {
  const addClick = (selector, target) => {
    const btn = document.querySelector(selector);
    if (btn)
      btn.addEventListener("click", () => (window.location.href = target));
  };

  addClick(".js-search", "./Search.html");
  addClick(".nav__search", "./Search.html");
  addClick(".js-about", "./about.html");
  addClick(".nav__about", "./about.html");
}

/* -----------------------------------------------------
   ESC CLOSE MENU
----------------------------------------------------- */

function initEscClose() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const menu = document.querySelector(".mobile-menu");
      if (menu && menu.classList.contains("active")) toggleMenu();
    }
  });
}

/* -----------------------------------------------------
   INIT ALL
----------------------------------------------------- */

function init() {
  insertNavbar();
  insertAuthenOverlay();

  initMobileMenu();
  initExtraButtons();
  initEscClose();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else init();
