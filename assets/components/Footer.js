const styles = `

/* --------------------------------
-------------------------------- */
/* footer--section */
/* --------------------------------
-------------------------------- */
footer {
  width: 100%;
  background-color: black;
  color: white;
  padding: 50px 0 80px;
  margin-top: auto;
}

.footer__container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: clamp(50px, 25vw, 300px);
  padding: 0 40px;
}

.footer__newsletter {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  padding-left: 6px;
  justify-content: flex-start;
}

.footer__newsletter a {
  color: gray;
}

.newsletter__title {
  font-size: 1.75rem;
  line-height: 1.3;
  padding-top: 70px;
  /* flex-shrink: 0; */
  /* min-width: max-content; */
}

.newsletter__formbox {
  display: flex;
}

.newsletter__formbox input {
  /* height: 20px; */
  padding: 18px 20px;
  border-radius: 16px 0 0 16px;
  border: none;
  outline: none;
  font-size: 1.3em;
  font-weight: bolder;
  flex: 1;
}

.newsletter__formbox button {
  border-radius: 0 16px 16px 0;
  padding: 18px 20px;
  border-left: none;
  font-size: 1.3em;
  font-weight: bold;
  background-color: gray;
  color: whitesmoke;
  border: none;
  outline: none;
  cursor: pointer;
  white-space: nowrap;
}

.newsletter__formbox button:hover {
  transition: background-color 0.7s ease;
  background-color: rgb(0, 102, 255);
}

.siteinfo__formbox input::placeholder {
  /* giống h2 */

  /* chữ đậm */
  /* line-height: 1; */
  /* min-width: max-content; */
  color: gray;

  /* khoảng cách dòng */
}

.siteinfo__right {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  gap: 30px;
}

.siteinfo__right a {
  color: white;
  text-decoration: none;
}

.icon__container {
  display: flex;
  gap: 40px;
  padding-top: 60px;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

a:hover i {
  color: gray;
  transition: color 0.3s ease;
}

.fa-brands {
  font-size: 45px;
  height: 45px;
  cursor: pointer;
}

.contact {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  font-weight: bolder;
}

.email {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  font-weight: bolder;
}

.end {
  margin-bottom: 10px;
}

.option {
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  font-weight: bolder;
  cursor: pointer;
  margin: 0 0 0 -130px;
  padding-right: auto;

  flex-direction: row;
}

.options__container li {
  list-style: none;
}

.options__container {
  margin-left: 50px;
}




`;
function injectStyle() {
  if (document.getElementById("footer-style")) return;
  const style = document.createElement("style");
  style.id = "footer-style";
  style.textContent = styles;
  document.head.appendChild(style);
}
export function initFooter() {
  injectStyle();
  return `
    <footer>
            <div class="footer__container">
                <div class="footer__newsletter">
                    <h2 class="newsletter__title">Get updates delivered directly to your inbox.</h2>
                    <!-- đổi div thành form -->
                    <form class="newsletter__formbox">
                        <input type="text" placeholder="Enter your email">
                        <button type="submit">Subscribe</button>
                    </form>
                    <p class="siteinfo__description">By subcribing you agree to our <a href="/">Privacy Policy</a> and
                        provide
                        consent
                        to receive updates from our company
                    </p>
                </div>
                <div class="siteinfo__right">
                    <div class="icon__container">
                        <!-- <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                    <i class="fa-brands fa-youtube"></i> -->
                        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                    <div class="contact">
                        <i class="fa-solid fa-phone-volume"></i>
                        <a href="tel:012312308721398">012312308721398</a>
                    </div>
                    <div class="email">
                        <i class="fa-solid fa-envelope"></i>
                        <a href="mailto:aurews@gmail.com">aurews@gmail.com</p>
                    </div>
                    <div class="end">
                        <p>© 2025 Nhóm 13, Inc. All rights reserved.</p>
                    </div>
                    <div class="options__container">
                        <ul class="option">
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookie Policy</li>
                            <li>Support</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    `;
}
