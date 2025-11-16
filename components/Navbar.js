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

        // Set active class based on current page
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".nav__categories a");
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === "index.html" && (currentPage === "index.html" || currentPage === "")) {
                link.classList.add("active");
            } else if (href === currentPage) {
                link.classList.add("active");
            }
        });

        document.querySelector(".nav__search").addEventListener("click", () => {
            window.location.href = "./Search.html";
        });
        document.querySelector(".nav__about").addEventListener("click", () => {
            window.location.href = "./about.html";
        });
    }
});
