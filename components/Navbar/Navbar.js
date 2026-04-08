import { toggleNav } from "../../assets/js/category.js";

function injectStyle() {
  if (document.getElementById("navbar-style")) return;

  const link = document.createElement("link");
  link.id = "navbar-style";
  link.href = "../components/Navbar/Navbar.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function createNavbar() {
  injectStyle();
  return `
    <nav class="nav__container" aria-label="Main navigation">
        <div class="nav__top">
            <div class="nav-item-wrapper">
                <div class="nav__search">
                    <!-- SEO: <a href> đã có sẵn, không cần addEventListener thêm -->
                    <a href="search.html">Search</a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__newsletter">
                    <p>News letter</p>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__logo">
                    <a href="index.html" aria-label="Aurews Home">AUREWS</a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__about">
                    <!-- SEO: <a href> đã có sẵn, không cần addEventListener thêm -->
                    <a href="about.html">About</a>
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
                <li><a href="./category.html?type=Money and Markets">Money &amp; Markets</a></li>
                <li><a href="./category.html?type=Tech and Innovation">Tech &amp; Innovation</a></li>
                <li><a href="./category.html?type=A.I.">A.I.</a></li>
                <li><a href="./category.html?type=Lifestyle">Lifestyle</a></li>
                <li><a href="./category.html?type=Politics">Politics</a></li>
                <!-- SEO: bỏ "Email" và "Podcast" vì không tồn tại trong data,
                     Google sẽ crawl và gặp trang trống → ảnh hưởng crawl budget -->
            </ul>
        </div>
    </nav>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar__placeholder");
  if (container) {
    container.innerHTML = createNavbar();
    toggleNav();

    // SEO: đã bỏ addEventListener cho nav__search và nav__about
    // vì cả hai đã có <a href> bên trong — duplicate handler không cần thiết
    // và có thể gây double navigation trên một số trình duyệt
  }
});
