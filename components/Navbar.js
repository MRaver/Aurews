import { toggleNav } from "../assets/js/category.js";

const styles = `
/* NAV */

.nav__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin: 0 auto;
    margin-top: 20px;
    max-width: 1400px;
}



.nav__top {
    display: flex;
    justify-content: space-around;
    padding-left: 10px;
    padding-right: 10px;
    
}


.nav__bottom {
    border-top: 1px solid black;
    margin-left: 20px;
    margin-right: 20px;
}



:is(.nav__about, .nav__search) a, .nav__newsletter p {
    font-family: var(--FF-HEADING);
    color: var(--FONT-COLOR);
    text-decoration: none;
    font-size: var(--FS-HEADING);
    font-weight: bolder;
}

.nav__logo a {
    font-size: var(--FS-LOGO);
    font-weight: bolder;
    text-align: center;
    text-decoration: none;
    color: var(--FONT-COLOR);
    font-family: var(--FF-HEADING);
}

:is(.nav__logo, .nav__hamburgermenu, .nav__about, .nav__newsletter, .nav__search):hover {
    transform: translateY(-5px);
    transition: color 0.3s ease;
}

:is(.nav__logo, .nav__hamburgermenu, .nav__about, .nav__newsletter, .nav__search):active {
    background-color: var(--NAV-ACTIVE-COLOR);
    transform: translateY(5px);
    box-shadow: none;
}




.nav-item-wrapper:hover a, .nav-item-wrapper:hover p {
    color: var(--LINK-HOVER-COLOR); /* Example */
    transition: color 0.2s ease;
}
/* Wrapped cho animation nhảy lên của nav__top */
.nav-item-wrapper {
    position: relative; /* Important for positioning */
    width: 16.5vw; /* Set a max width for responsiveness */
    max-width: 235px;
    aspect-ratio: 5/2;
    overflow: hidden; /* This is the key! Hides the extra part */
    cursor: pointer;
    padding: 10px; /* Optional: adds some space above */
}

.nav__logo,
.nav__hamburgermenu,
.nav__about,
.nav__newsletter,
.nav__search {
    /* Make the element 8px taller than its wrapper */
    height: calc(100% + 8px); 
    
    /* Keep all your original styling for the shape */
    position: relative;
    width: 100%; /* Take full width of wrapper */
    background:
        radial-gradient(ellipse 85% 100% at 50% 100%,
            transparent 0%,
            transparent calc(100% - 2px), /* Adjusted for border */
            black calc(100% - 2px),
            black 100%);
    clip-path: ellipse(85% 100% at 50% 100%);
    border: 2px solid black;
    border-bottom: none;
    /* Keep flex properties */
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    /* transform này để khi xuống k bị khựng */
    transition: transform 400ms ease;
    margin-top: 8px;/* Push down to hide the extra part */
    margin-bottom: 5px; 
}

/* --- 3. The Hover Effect --- */
/* We trigger the hover on the wrapper, but move the inner element */
.nav-item-wrapper:hover .nav__search,
.nav-item-wrapper:hover .nav__newsletter,
.nav-item-wrapper:hover .nav__logo,
.nav-item-wrapper:hover .nav__about,
.nav-item-wrapper:hover .nav__hamburgermenu {
    transform: translateY(-8px);
    transition: transform 500ms ease;
}



/* HAMBURGER MENU */
.nav__hamburgermenu__icon {
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  
    width: 60px;  /* Giảm kích thước một chút cho cân đối */
    height: 40px; /* Chiều cao tổng thể của 3 thanh */
    
}

.nav__hamburgermenu span {
    display: block; 
    width: 100%;
    height: 8px; 
    background-color: black;
    border-radius: 25px;
    /* Animation cho cái ham */
    transition: 0.3s ease;
}
.nav__hamburgermenu:hover span {
    background-color: brown;
}
/* NAV BOTTOM */
.nav__categories {
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 20px;
    /* ẨN HOÀN TOÀN SCROLLBAR */
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE/Edge */
}

/* Ẩn scrollbar cho Chrome/Safari/Opera */
.nav-list::-webkit-scrollbar {
    display: none;
}

.nav__categories a {
    display: inline-block;
    padding: 5px 5px;
    text-decoration: none;
    color: var(--FONT-COLOR);
    font-weight: bold;
    text-transform: uppercase;
    font-size: small;
    margin-top: 5px;
    margin-left: 7px;
    margin-right: 7px;
}

.nav__categories li {
    list-style: none;
    flex-shrink: 0;
}

.nav__categories li a.active{
    background-color: rgb(232, 5, 39);
    color: white;
}
.nav__categories a:hover{
    background-color: var(--NAV-HOVER-COLOR);
    color: white;
}





/* || MEDIA QUERIES*/


/* ------------------ Media Query: ≤1200px (Large tablets / small desktops) ------------------ */
@media only screen and (max-width: 1200px) {

    .nav__top {
        margin-top: 2vh;
    } 
    .nav-item-wrapper{
        padding: 0;
    }
    
}

/* ------------------ Media Query: ≤992px (Tablets) ------------------ */
@media only screen and (max-width: 992px) {

    .nav-item-wrapper:has(.nav__about),
    .nav-item-wrapper:has(.nav__newsletter) {
        display: none;
    }
    .nav-item-wrapper{
        width: 30vw;
    }
    
}

/* ------------------ Media Query: ≤768px (Small tablets / large phones) ------------------ */
@media only screen and (max-width: 768px) {

   
    .nav__top {
        display: flex;
        justify-content: space-around;
        padding-left: 20px; 
        padding-right: 20px;
    }

   
}

/* ------------------ Media Query: ≤600px (Phones) ------------------
   Example: This section contains focused adjustments for small screens.
   - NAV TOP: compact spacing and layout tweaks
   - HIDE SEARCH: remove search from top bar for space
   - LOGO: center and remove decorative borders for cleaner look
   - HAMBURGER MENU: simplify visuals and sizing
   - FOOTER: stack and center content for narrow widths
----------------------------------------------------------------------------------------- */
@media only screen and (max-width: 600px) {

    /* NAV TOP */
    .nav__top {
        display: flex;
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px;
        position: relative;
    }
    /* HIDE SEARCH */
    .nav-item-wrapper:has(.nav__search) {
        display: none;
    }
    /* LOGO */
    .nav-item-wrapper:has(.nav__logo) {
        position: absolute;
        margin: 0 auto; 
        width: auto; 
        padding: 0;
        aspect-ratio: unset;
        left: 50%;
        transform: translateX(-50%);
    }
    .nav__logo{
        border: none;
        background: none;
        clip-path: none;
        height: auto;
    }
    /* HAMBURGER MENU */
    .nav__hamburgermenu {
        background: none;
        border: none;
        clip-path: none;
        height: auto;
    }
    .nav__hamburgermenu__icon {
        width: 30px; 
        height: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
   
    .nav__hamburgermenu span {
        display: block; 
        width: 100%;
        height: 4px; 
        background-color: black;
        border-radius: 25px;
    }
    .nav-item-wrapper:has(.nav__hamburgermenu) {
        margin-left: auto;
        z-index: 10;
        width: auto; 
        padding-top: 0; 
        aspect-ratio: unset; /* Tắt tỷ lệ khung hình */
        overflow: visible;
    }




}  

`;
function injectStyle() {
    if (document.getElementById("navbar-style")) return;

    const style = document.createElement("style");
    style.id = "navbar-style";
    style.textContent = styles;
    document.head.appendChild(style);
}
function createNavbar() {
    injectStyle();
    return `
    <nav class="nav__container">
        <div class="nav__top">
            <div class="nav-item-wrapper">
                <div class="nav__search">
                    <a href="search.html">
                        Search
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__newsletter">
                    <p>News letter</p>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__logo">
                    <a href="index.html">
                        AUREWS
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__about">
                    <a href="about.html">
                        About
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__hamburgermenu" onclick="toggleMenu(); return false;" aria-label="Toggle menu">
                    <div class="nav__hamburgermenu__icon menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav__bottom">
            <ul class="nav__categories">
                <li><a href="index.html">Home</a></li>
                <li><a href="./category.html?type=Latest">Latest</a></li>
                <li><a href="./category.html?type=Business News">Business News</a></li>
                <li><a href="./category.html?type=Money and Markets">Money & Markets</a></li>
                <li><a href="./category.html?type=Tech and Innovation">Tech & Innovation</a></li>
                <li><a href="./category.html?type=A.I.">A.I.</a></li>
                <li><a href="./category.html?type=Lifestyle">Lifestyle</a></li>
                <li><a href="./category.html?type=Politics">politics</a></li>
                <li><a href="./category.html?type=Email">email</a></li>
                <li><a href="./category.html?type=Podcast">podcast</a></li>
            </ul>
        </div>
    </nav>
    `;
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("navbar__placeholder");
    console.log(container);
    if (container) {
        console.log("Loaded");
        container.innerHTML = createNavbar();
        toggleNav();

        document.querySelector(".nav__search").addEventListener("click", () => {
            window.location.href = "./Search.html";
        });
        document.querySelector(".nav__about").addEventListener("click", () => {
            window.location.href = "./about.html";
        });
    }
    // Types mapping - map text từ HTML đến type parameter
    const typeMapping = {
        Home: null, // Home không có type
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
        Contact: null, // Contact là trang riêng
    };

    const types = [
        "Latest",
        "Business News",
        "Money and Markets",
        "Tech and Innovation",
        "A.I.",
        "Lifestyle",
        "Politics",
        "Email",
        "Podcast",
    ];

    function toggleMenu() {
        const mobileMenu = document.querySelector(".mobile-menu");
        const overlay = document.querySelector(".mobile-menu-overlay");
        const body = document.body;

        if (!mobileMenu || !overlay) return;

        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains("active")) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    }

    // Set active class cho mobile menu dựa trên URL hiện tại (giống toggleNav)
    function toggleMobileNav() {
        const params = new URLSearchParams(window.location.search);
        const param = params.get("type");
        const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
        const currentPath = window.location.pathname;

        if (mobileNavLinks.length === 0) return;

        // Reset all active classes
        mobileNavLinks.forEach((link) => link.classList.remove("active"));

        // Set active cho Home nếu đang ở Index.html
        if (
            currentPath.includes("Index.html") ||
            currentPath.endsWith("/") ||
            currentPath.includes("index.html") ||
            (!currentPath.includes("Category.html") &&
                !currentPath.includes("Post.html") &&
                !currentPath.includes("Contact.html"))
        ) {
            const homeLink = Array.from(mobileNavLinks).find(
                (link) =>
                    link.textContent.trim() === "Home" ||
                    link.getAttribute("href")?.includes("Index.html")
            );
            if (homeLink) {
                homeLink.classList.add("active");
            }
            return;
        }

        // Set active cho category dựa trên type parameter
        if (param) {
            mobileNavLinks.forEach((link) => {
                const linkText = link.textContent.trim();
                const mappedType = typeMapping[linkText];

                if (mappedType === param) {
                    link.classList.add("active");
                }
            });
        }

        // Set active cho Contact nếu đang ở Contact.html
        if (currentPath.includes("Contact.html")) {
            const contactLink = Array.from(mobileNavLinks).find(
                (link) => link.textContent.trim() === "Contact"
            );
            if (contactLink) {
                contactLink.classList.add("active");
            }
        }
    }

    // Khởi tạo URLs cho mobile menu links nếu chưa có
    function initMobileMenuLinks() {
        const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
        if (mobileNavLinks.length === 0) return;

        mobileNavLinks.forEach((link) => {
            const linkText = link.textContent.trim();
            const currentHref = link.getAttribute("href");

            // Set URL nếu href là "#" hoặc rỗng
            if (!currentHref || currentHref === "#" || currentHref.trim() === "") {
                if (linkText === "Home") {
                    link.setAttribute("href", "./Index.html");
                } else if (linkText === "Contact") {
                    link.setAttribute("href", "./Contact.html");
                } else {
                    // Lấy type từ mapping - normalize "Money & Markets" to "Money and Markets"
                    let mappedType = typeMapping[linkText];
                    // Handle fallback for different text formats
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

    // Khởi tạo mobile menu
    function initMobileMenu() {
        // Khởi tạo URLs cho mobile menu - gọi multiple times để ensure component đã render
        initMobileMenuLinks();
        setTimeout(() => initMobileMenuLinks(), 50);
        setTimeout(() => initMobileMenuLinks(), 200);

        // Set active class ban đầu
        toggleMobileNav();

        // Handle click on mobile menu links - ensure proper navigation
        const setupLinkHandlers = () => {
            // Ensure URLs are set first
            initMobileMenuLinks();

            document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
                // Remove existing listeners by cloning node
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);

                newLink.addEventListener("click", function (e) {
                    const href = this.getAttribute("href");

                    // If href is empty or just "#", don't navigate
                    if (!href || href === "#" || href.trim() === "") {
                        e.preventDefault();
                        return;
                    }

                    // Prevent default link behavior
                    e.preventDefault();

                    // Close menu with animation
                    const mobileMenu = document.querySelector(".mobile-menu");
                    const overlay = document.querySelector(".mobile-menu-overlay");

                    if (mobileMenu && mobileMenu.classList.contains("active")) {
                        mobileMenu.classList.remove("active");
                        if (overlay) overlay.classList.remove("active");
                        document.body.style.overflow = "";
                    }

                    // Navigate after menu closes
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            });
        };

        // Setup handlers immediately and again after delays to ensure they're attached
        setupLinkHandlers();
        setTimeout(setupLinkHandlers, 50);
        setTimeout(setupLinkHandlers, 200);
    }

    // Khởi tạo khi DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMobileMenu);
    } else {
        // DOM đã sẵn sàng
        initMobileMenu();
    }

    // Close menu on ESC key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const mobileMenu = document.querySelector(".mobile-menu");
            if (mobileMenu && mobileMenu.classList.contains("active")) {
                toggleMenu();
            }
        }
    });

    // Make toggleMenu available globally
    window.toggleMenu = toggleMenu;
    // Guard trước khi thêm event listener để tránh lỗi khi element không tồn tại
    const jsSearchEl = document.querySelector(".js-search");
    if (jsSearchEl) {
        jsSearchEl.addEventListener("click", () => {
            window.location.href = "./search.html";
        });
    }

    const jsAboutEl = document.querySelector(".js-about");
    if (jsAboutEl) {
        jsAboutEl.addEventListener("click", () => {
            window.location.href = "./about.html";
        });
    }
});
