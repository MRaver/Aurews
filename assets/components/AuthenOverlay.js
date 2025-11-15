const styles = `





/* =========================================================
   AUTH POPUP OVERLAY
   ========================================================= */

.popup-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.popup-overlay.active {
  display: flex;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}


/* =========================================================
   POPUP CONTENT
   ========================================================= */

.popup-content {
  background: #f2d9b4;
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 450px;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  /* FIX SCROLL KHI FORM LONG */
  max-height: 90vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  } 
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


/* CLOSE BUTTON */
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  color: black;
  cursor: pointer;
  transition: color 0.3s;
  background: none;
  border: none;
  line-height: 1;
}

.close-btn:hover {
  color: white;
}


/* TITLE */
.popup-content h2 {
  color: black;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
}


/* FORM GROUP */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: black;
}


/* SUBMIT BUTTON */
.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #f2d9b4 0%, white 100%);
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}


/* FOOTER */
.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #777;
}

.form-footer a {
  color: black;
  text-decoration: none;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}


/* =========================================================
   TABS
   ========================================================= */

.tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  color: black;
  font-weight: 600;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.tab.active {
  color: white;
  border-bottom-color: red;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}


/* =========================================================
   SCROLLBAR (OPTIONAL)
   ========================================================= */

.popup-content::-webkit-scrollbar {
  width: 6px;
}

.popup-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px;
}
.popup-content::-webkit-scrollbar-track {
    background: transparent; /* không lộ nền */
  }

.popup-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.35);
  }

`;

const insertStyles = () => {
  if (document.getElementById("authen-overlay-style")) return;
  const styleSheet = document.createElement("style");
  styleSheet.id = "authen-overlay-style";
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
};
export function initAuthenOverlay() {
  insertStyles();
  return `
  <div class="popup-overlay" id="popupOverlay" onclick="closePopupOnOverlay(event)">
<div class="popup-content" onclick="event.stopPropagation()">
    <button class="close-btn" onclick="closePopup()">&times;</button>

    <!-- Tabs -->
    <div class="tabs">
        <div class="tab active" id="loginTab" onclick="switchTab('login')">Login</div>
        <div class="tab" id="registerTab" onclick="switchTab('register')">Sign up</div>
    </div>

    <!-- Form Đăng Nhập -->
    <div class="tab-content active" id="loginContent">
        <h2>Login</h2>
        <form id="loginForm" onsubmit="">
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="email-login" placeholder="Type your email" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="password-login" placeholder="Password" required>
            </div>
            <button type="submit" class="submit-btn">Login</button>
        </form>
        <div class="form-footer">
            Don't have an account? <a href="#" onclick="switchTab('register'); return false;">Sign up
                now!</a>
        </div>
    </div>

    <!-- Form Đăng Ký -->
    <div class="tab-content" id="registerContent">
        <h2>Sign up</h2>
        <form id="signUpForm" onsubmit="handleRegister(event)">
            <div class="form-group">
                <label>Full name</label>
                <input type="text" placeholder="Type your name here" required class="full-name-sign-up">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Type your email here" required class="email-sign-up">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="8-15 letters required" required class="password-sign-up">
            </div>
            <div class="form-group">
                <label>Confirm password</label>
                <input type="password" placeholder="" required class="confirm-sign-up">
            </div>
            <button type="submit" class="submit-btn">Sign up</button>
        </form>
        <div class="form-footer">
            Have an account? <a href="#" onclick="switchTab('login'); return false;">Login</a>
        </div>
    </div>
</div>
</div>

  `;
}
