function injectStyle() {
  if (document.getElementById("footer-style")) return;

  const link = document.createElement("link");
  link.id = "footer-style";
  link.href = "../components/Footer/Footer.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function createFooter() {
  injectStyle();
  return `
    <footer>
        <div class="footer__container">
            <div class="footer__newsletter">
                <h2 class="newsletter__title">Get updates delivered directly to your inbox.</h2>
                <form class="newsletter__formbox">
                    <input type="email" placeholder="Enter your email" aria-label="Email address for newsletter">
                    <button type="submit">Subscribe</button>
                </form>
                <p class="siteinfo__description">
                    By subscribing you agree to our
                    <!-- SEO: sửa href="/" → href đúng, tránh trỏ về root không rõ ràng -->
                    <a href="about.html#privacy">Privacy Policy</a>
                    and provide consent to receive updates from our company.
                </p>
            </div>
            <div class="siteinfo__right">
                <div class="icon__container">
                    <a href="#" aria-label="Follow Aurews on Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" aria-label="Follow Aurews on Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="Follow Aurews on Twitter/X"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#" aria-label="Follow Aurews on YouTube"><i class="fa-brands fa-youtube"></i></a>
                </div>
                <div class="contact">
                    <i class="fa-solid fa-phone-volume"></i>
                    <a href="tel:+840123456789">0123456789</a>
                </div>
                <div class="email">
                    <i class="fa-solid fa-envelope"></i>
                    <!-- SEO: sửa lỗi HTML — thẻ <a> bị đóng bằng </p> thay vì </a> -->
                    <a href="mailto:aurews@gmail.com">aurews@gmail.com</a>
                </div>
                <div class="end">
                    <p>© 2025 Nhóm 13, Inc. All rights reserved.</p>
                </div>
                <div class="options__container">
                    <!-- SEO: chuyển các li text thuần thành <a href> để Google crawl được
                         và người dùng có thể click -->
                    <ul class="option">
                        <li><a href="about.html#terms">Terms</a></li>
                        <li><a href="about.html#privacy">Privacy</a></li>
                        <li><a href="about.html#cookies">Cookie Policy</a></li>
                        <li><a href="contact.html">Support</a></li>
                        <li><a href="/sitemap.xml" target="_blank" rel="noopener">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("footer__placeholder");
  if (container) {
    container.innerHTML = createFooter();
  }
});
