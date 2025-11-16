// console.log("LOGIN.JS LOADED");
function openPopup(tab) {
  document.getElementById("popupOverlay").classList.add("active");
  document.getElementById("mainContent").classList.add("blur");
//   document.getElementById("mobile-menu__placeholder").classList.add("blur");
  switchTab(tab);
}

function closePopup() {
  document.getElementById("popupOverlay").classList.remove("active");
  document.getElementById("mainContent").classList.remove("blur");
//   document.getElementById("mobile-menu__placeholder").classList.remove("blur");
}

function closePopupOnOverlay(event) {
  if (event.target === document.getElementById("popupOverlay")) {
    closePopup();
  }
}

function switchTab(tab) {
  // Remove active class from all tabs
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  // Add active class to selected tab
  if (tab === "login") {
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("loginContent").classList.add("active");
  } else {
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("registerContent").classList.add("active");
  }
}

// Đóng popup khi nhấn ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});

//  luu thong tin sign-up
let allSignUp;
try {
  const stored = localStorage.getItem("userInfo");
  allSignUp = stored ? JSON.parse(stored) : [];

  // Đảm bảo là array
  if (!Array.isArray(allSignUp)) {
    allSignUp = [];
  }
} catch (error) {
  console.error("Error parsing localStorage:", error);
  allSignUp = [];
}
function saveSignUp() {
  const signUpForm = document.getElementById("signUpForm");
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.querySelector(".full-name-sign-up").value.trim();
    const email = document.querySelector(".email-sign-up").value.trim();
    const password = document.querySelector(".password-sign-up").value.trim();
    const confirmPass = document.querySelector(".confirm-sign-up").value.trim();

    if (password !== confirmPass) {
      alert("Password must be same as confirm password!");
      return;
    } else {
      const thongTin = {
        fullName,
        email,
        password,
      };
      console.log(thongTin);
      const isExisted = allSignUp.some(
        (user) =>
          user.fullName === thongTin.fullName &&
          user.email === thongTin.email &&
          user.password === thongTin.password
      );
      if (isExisted) {
        alert("Account existed!");
        return; // Dừng hàm nếu đã tồn tại
      }
      allSignUp.push(thongTin);
      localStorage.setItem("userInfo", JSON.stringify(allSignUp));
      alert("Sign up succeed");
      console.log(localStorage);
      signUpForm.reset();
    }
  });
}
//localStorage: nhớ comment bên dưới vì dùng localStorage
//duyet thong tin dang nhap
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
function Login() {
  console.log("Login() được chạy");
  const loginForm = document.getElementById("loginForm");

  console.log("loginForm =", loginForm);

  if (!loginForm) {
    console.error("KHÔNG TÌM THẤY loginForm!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    console.log("LOGIN SUBMITTED");
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userInfo")) || [];
    const emailSignIn = document.querySelector(".email-login").value.trim();
    const passSignIn = document.querySelector(".password-login").value.trim();
    const thongTinDangNhap = {
      emailSignIn,
      passSignIn,
      accessToken: generateToken(),
    };
    const isExisted = storedUser.some(
      (user) => user.email === emailSignIn && user.password === passSignIn
    );
    if (isExisted) {
      alert("Login Suceed!");
      localStorage.setItem("userLogin", JSON.stringify(thongTinDangNhap));
      window.location.reload();
    } else alert("Login Fail!");
  });
}

function userLoginHTML() {
  const tokenn = JSON.parse(localStorage.getItem("userLogin"));
  let role = "reader";
  // If no token stored, treat as reader
  if (tokenn && tokenn.accessToken) {
    // Note: accessToken may be a string; comparing to number 123 may never be true
    if (tokenn.accessToken === 123) {
      role = "admin";
    } else {
      role = "author";
    }
  }
  if (role === "author") {
    const container = document.querySelector(".mobile-menu-footer");
    const loginContainer = document.getElementById("login-button");
    if (loginContainer) {
      loginContainer.outerHTML = `<div id="logout-button" class="mobile-menu-footer-item">Log out</div>`;
    }
    if (container) {
      container.insertAdjacentHTML(
        "beforeend",
        `\n        <div id="addpost-button" class="mobile-menu-footer-item">Add post</div>\n        `
      );
    }
  } else if (role === "admin") {
    const container = document.querySelector(".mobile-menu-footer");
    const loginContainer = document.getElementById("login-button");
    if (loginContainer) {
      loginContainer.outerHTML = `<div id="logout-button" class="mobile-menu-footer-item">Log out</div>`;
    }
    if (container) {
      container.insertAdjacentHTML(
        "beforeend",
        `\n            <div id="dashboard-button" class="mobile-menu-footer-item">Dashboard</div>\n        `
      );
      const dashboardBtn = document.getElementById("dashboard-button");
      if (dashboardBtn) {
        dashboardBtn.addEventListener("click", () => {
          window.location.href = "./adminDashboard.html";
        });
      }
    }
  }
  //Log-out
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userLogin");
      alert("You have been logged out!");
      // If user is on addPost page, redirect to Index instead of reloading (which may keep them on restricted page)
      const pathname = window.location.pathname || window.location.href;
      if (pathname.includes("addPost.html")) {
        // use relative link so it works from pages/ folder
        window.location.href = "Index.html";
      } else {
        window.location.reload();
      }
    });
  }
}

function clickAddPostButton() {
  const addBtn = document.getElementById("addpost-button");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      window.location.href = `./addPost.html`;
    });
  }
}

//backend
//         const res = await fetch('http://localhost:6666/api/auth/login',
//             {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(thongTin),
//             }
//         )
//         if (res.ok) {
//             alert("Sign up succeed!");
//         }
//         else {
//             alert("Sign up failed!");
//         }
//     }
// })

//backend
// if (!username || !passSignIn) {
//     alert("Please enter email and password!");
//     return;
// }

// try {
//     console.log(username, passSignIn);
//     const res = await fetch('http://localhost:1234/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             password: passSignIn
//         }),
//         credentials: "include",
//     })

//     const data = await res.json();

//     if (res.ok && data.success) {
//         alert("Login Succeed!");
//         console.log(data);
//         console.log(res);
//         localStorage.setItem('saveToken', data.accessToken);
//         window.location.reload();
//         // Nếu backend trả token hoặc user info
//         // localStorage.setItem('token', data.token);
//         // localStorage.setItem('user', JSON.stringify(data.user));

//     } else {
//         alert(data.message || "Login failed!");
//     }
// } catch (err) {
//     console.log("Login error:", err);
//     alert("Login failed due to network or server error!");
// }
// });

//backend
// Hàm 1: Lấy thông tin user từ backend
// async function getUser() {
//     // const token = JSON.parse(localStorage.getItem('accessToken'));
//     // if (!token) return null;

//     try {

//         const result = await fetch('http://localhost:1234/api/me/get', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: "include"
//         })

//         const user = await result.json();
//         console.log(user);

//         // if (!res.ok) {
//         //     console.warn('Token không hợp lệ hoặc hết hạn');
//         //     localStorage.removeItem('accessToken');
//         //     return null;
//         // }

//         // const user = await res.json(); // ví dụ { name, email, role }
//         // console.log(user);
//         // return user;

//     } catch (error) {
//         console.error('Lỗi khi fetch user:', error);
//         return null;
//     }
// }

// // Hàm 2: Render UI dựa theo role
// async function userLoginHTML() {
//     const container = document.querySelector('.mobile-menu-footer');
//     const loginContainer = document.getElementById('login-button');

//     const user = await getUser();
//     if (!user) {
//         console.log('Chưa đăng nhập → hiển thị nút login mặc định');
//         return;
//     }

//     const role = user.role;
//     loginContainer.outerHTML = `
//         <div id="logout-button" class="mobile-menu-footer-item">Log out</div>
//     `;

//     if (role === 'author') {
//         container.innerHTML += `
//             <div id="addpost-button" class="mobile-menu-footer-item">Add Post</div>
//         `;
//         document.getElementById('addpost-button').addEventListener('click', () => {
//             window.location.href = './addPost.html';
//         });
//     }

//     if (role === 'admin') {
//         container.innerHTML += `
//             <div id="dashboard-button" class="mobile-menu-footer-item">Dashboard</div>
//         `;
//         document.getElementById('dashboard-button').addEventListener('click', () => {
//             window.location.href = './adminDashboard.html';
//         });
//     }

//     // Logout
//     document.getElementById('logout-button').addEventListener('click', () => {
//         localStorage.removeItem('accessToken');
//         alert('You have been logged out!');
//         window.location.reload();
//     });
// }
