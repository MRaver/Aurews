// Types mapping - map text từ HTML đến type parameter
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

// Toggle mobile menu và overlay
export function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-menu-overlay");

  if (!mobileMenu || !overlay) return;

  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Set active class cho mobile menu links dựa trên URL
export function toggleMobileNav() {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("type");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const currentPath = window.location.pathname.toLowerCase();

  if (mobileNavLinks.length === 0) return;

  // Reset tất cả active classes
  mobileNavLinks.forEach((link) => link.classList.remove("active"));

  // Bỏ qua set active cho search và about pages
  if (currentPath.includes("search.html") || currentPath.includes("about.html")) {
    return;
  }

  // Set active cho Home link
  if (
    currentPath.endsWith("/") ||
    currentPath.includes("index.html") ||
    (!currentPath.includes("category.html") &&
      !currentPath.includes("post.html") &&
      !currentPath.includes("contact.html"))
  ) {
    const homeLink = Array.from(mobileNavLinks).find(
      (link) =>
        link.textContent.trim() === "Home" ||
        link.getAttribute("href")?.includes("index.html")
    );
    if (homeLink) {
      homeLink.classList.add("active");
    }
    return;
  }

  // Set active cho category links dựa trên type parameter
  if (param) {
    mobileNavLinks.forEach((link) => {
      const linkText = link.textContent.trim();
      const mappedType = typeMapping[linkText];

      if (mappedType === param) {
        link.classList.add("active");
      }
    });
  }

  // Set active cho Contact link
  if (currentPath.includes("contact.html")) {
    const contactLink = Array.from(mobileNavLinks).find(
      (link) => link.textContent.trim() === "Contact"
    );
    if (contactLink) {
      contactLink.classList.add("active");
    }
  }
}

// Khởi tạo URLs cho mobile menu links
export function initMobileMenuLinks() {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  if (mobileNavLinks.length === 0) return;

  mobileNavLinks.forEach((link) => {
    const linkText = link.textContent.trim();
    const currentHref = link.getAttribute("href");

    // Chỉ set URL nếu href chưa có hoặc là "#"
    if (!currentHref || currentHref === "#" || currentHref.trim() === "") {
      if (linkText === "Home") {
        link.setAttribute("href", "./Index.html");
      } else if (linkText === "Contact") {
        link.setAttribute("href", "./Contact.html");
      } else {
        let mappedType = typeMapping[linkText];

        // Fallback cho format khác của "Money & Markets"
        if (!mappedType && linkText === "Money & Markets") {
          mappedType = typeMapping["Money and Markets"];
        }

        if (mappedType) {
          link.setAttribute(
            "href",
            `./Category.html?type=${encodeURIComponent(mappedType)}`
          );
        }
      }
    }
  });
}

// Setup click handlers cho mobile menu links
function setupMobileMenuLinkHandlers() {
  // Ensure URLs được set trước
  initMobileMenuLinks();

  document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
    // Clone node để remove existing listeners
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);

    newLink.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Không navigate nếu href empty hoặc "#"
      if (!href || href === "#" || href.trim() === "") {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // Đóng menu với animation
      const mobileMenu = document.querySelector(".mobile-menu");
      const overlay = document.querySelector(".mobile-menu-overlay");

      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Navigate sau khi menu đóng
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// Khởi tạo mobile menu
export function initMobileMenu() {
  // Khởi tạo URLs - multiple calls để ensure component đã render
  initMobileMenuLinks();
  setTimeout(() => initMobileMenuLinks(), 50);
  setTimeout(() => initMobileMenuLinks(), 200);

  // Set active class ban đầu
  toggleMobileNav();

  // Setup click handlers
  setupMobileMenuLinkHandlers();
  setTimeout(setupMobileMenuLinkHandlers, 50);
  setTimeout(setupMobileMenuLinkHandlers, 200);
}

// Đóng menu khi nhấn ESC
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      toggleMenu();
    }
  }
}

// Navigate đến search page
function handleSearchClick() {
  window.location.href = "./search.html";
}

// Navigate đến about page
function handleAboutClick() {
  window.location.href = "./about.html";
}

// Khởi tạo tất cả event listeners khi DOM ready
function initializeApp() {
  // Khởi tạo mobile menu
  initMobileMenu();

  // ESC key handler
  document.addEventListener("keydown", handleEscapeKey);

  // Search button handler
  const jsSearchEl = document.querySelector(".js-search");
  if (jsSearchEl) {
    jsSearchEl.addEventListener("click", handleSearchClick);
  }

  // About button handler
  const jsAboutEl = document.querySelector(".js-about");
  if (jsAboutEl) {
    jsAboutEl.addEventListener("click", handleAboutClick);
  }

  // Make toggleMenu available globally
  window.toggleMenu = toggleMenu;
}

// Chạy khi DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}