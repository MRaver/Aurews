const styles = `

/* NAV */
.nav__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin: 0 auto;
  max-width: 1440px;
}

.nav__container {
  padding: 0 16px;
}

.nav__top {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* gap: 20px; */
  /* margin-left: 20px; */
  margin-top: 2vh;
  padding-left: 10px;
  padding-right: 10px;
}

.nav__bottom {
  border-top: 1px solid black;
  margin-left: 5px;
}

:is(.nav__logo, .nav__about) a,
:is(.nav__newsletter, .nav__search) p {
  font-family: var(--FF-HEADING);
  /* font-style: italic; */
  color: var(--FONT-COLOR);
  text-decoration: none;
  font-size: var(--FS-HEADING);
}

.nav__logo a {
  display: block;
  font-size: var(--FS-LOGO);
  font-weight: bolder;
  text-align: center;
  text-decoration: none;
}

:is(
    .nav__logo,
    .nav__hamburgermenu,
    .nav__about,
    .nav__newsletter,
    .nav__search
  ):hover {
  transform: translateY(-5px);
  transition: color 0.3s ease;
}

:is(
    .nav__logo,
    .nav__hamburgermenu,
    .nav__about,
    .nav__newsletter,
    .nav__search
  ):active {
  background-color: var(--NAV-ACTIVE-COLOR);
  transform: translateY(5px);
  box-shadow: none;
}

.nav__logo:hover a {
  color: var(--LINK-HOVER-COLOR);
  transition: color 0.2s ease;
}

:is(.nav__about, .nav__newsletter, .nav__search):hover p {
  color: var(--LINK-HOVER);
  transition: color 0.2s ease;
}

/* Wrapped cho animation nhảy lên của nav__top */
.nav-item-wrapper {
  position: relative;
  /* Important for positioning */
  width: 16.5vw;
  aspect-ratio: 5/2;
  overflow: hidden;
  /* This is the key! Hides the extra part */
  cursor: pointer;
  padding-top: 20px;
  /* Optional: adds some space above */
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
  width: 100%;
  /* Take full width of wrapper */
  background: radial-gradient(
    ellipse 85% 100% at 50% 100%,
    transparent 0%,
    transparent calc(100% - 2px),
    /* Adjusted for border */ black calc(100% - 2px),
    black 100%
  );
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

/* You might need to adjust your text color change as well */
.nav-item-wrapper:hover a,
.nav-item-wrapper:hover p {
  color: var(--LINK-HOVER-COLOR);
  /* Example */
}

/* Nửa dưới hình elip */
/* .nav__logo,
.nav__hamburgermenu,
.nav__about,
.nav__newsletter,
.nav__search {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 16.5vw;
    aspect-ratio: 5/2;
    background:
        radial-gradient(ellipse 85% 100% at 50% 100%,
            transparent 0%,
            transparent calc(100% - 0.1px),
            black calc(100% - 0.1px),
            black 100%);
    clip-path: ellipse(85% 100% at 50% 100%);
    border: 2px solid black;
    border-bottom: none;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    user-select: none;
    transition: transform 120ms ease, color 200ms ease;
    overflow: hidden;
    flex-shrink: 0;
} */

.nav__hamburgermenu:hover span {
  background-color: brown;
}

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
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  font-size: small;
  margin-top: 5px;
}

.nav__categories li {
  list-style: none;
}

.nav__categories a.active {
  background-color: rgb(232, 5, 39);
  color: white;
}

.nav__categories a:hover {
  background-color: var(--NAV-HOVER-COLOR);
  color: white;
}

.nav__hamburgermenu {
  text-decoration: none;
  color: black;
  flex-shrink: 0;
}

.nav__hamburgermenu__icon {
  height: 50px;
  width: 50px;
  display: flex;
  position: relative;
}

.nav__hamburgermenu span {
  height: 8px;
  width: 100%;
  background-color: black;
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease;
}

.nav__hamburgermenu span:nth-child(1) {
  top: 25%;
}

.nav__hamburgermenu span:nth-child(3) {
  top: 75%;
}

.nav__categories li:nth-child(4) a {
  flex-shrink: 0;
  min-width: max-content;
}

.nav__categories li:nth-child(3) a {
  flex-shrink: 0;
  min-width: max-content;
}

.nav__categories li:nth-child(5) a {
  flex-shrink: 0;
  min-width: max-content;
}


`;
function injectStyle() {
  if (document.getElementById("navbar-style")) return;
  const style = document.createElement("style");
  style.id = "navbar-style";
  style.textContent = styles;
  document.head.appendChild(style);
}
export function initNavbar() {
  injectStyle();
  return `
    <nav class="nav__container">
        <div class="nav__top">
            <div class="nav-item-wrapper">
                <div class="nav__search">
                    <p>Search</p>
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
                        <p>About</p>
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__hamburgermenu">
                    <div class="nav__hamburgermenu__icon menu-toggle" onclick="toggleMenu(); return false;"
                        aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav__bottom">
            <ul class="nav__categories">
                <li><a href="Index.html" class="active">Home</a></li>
                <li><a href="./Category.html?type=Latest">Latest</a></li>
                <li><a href="./Category.html?type=Business News">Business News</a></li>
                <li><a href="./Category.html?type=Money and Markets">Money & Markets</a></li>
                <li><a href="./Category.html?type=Tech and Innovation">Tech & Innovation</a></li>
                <li><a href="./Category.html?type=A.I.">A.I.</a></li>
                <li><a href="./Category.html?type=Lifestyle">Lifestyle</a></li>
                <li><a href="./Category.html?type=Politics">politics</a></li>
                <li><a href="./Category.html?type=Email">email</a></li>
                <li><a href="./Category.html?type=Podcast">podcast</a></li>
            </ul>
        </div>
    </nav>

    `;
}
