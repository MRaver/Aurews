// Đợi cho tất cả nội dung HTML tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Tìm "chỗ" đã tạo
  const authenOverlayPlaceholder = document.getElementById(
    "authenOverlay-placeholder"
  );
  const navPlaceholder = document.getElementById("nav-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");
  const mobileMenuPlaceholder = document.getElementById(
    "mobile-menu-placeholder"
  );
  // Nếu tìm thấy "chỗ"
  if (navPlaceholder) {
    // Tải nội dung từ file nav.html
    fetch("../../components/nav/nav.html")
      .then((response) => {
        // Kiểm tra xem có tải file thành công không
        if (!response.ok) {
          throw new Error("Không thể tải navigation");
        }
        return response.text(); // Trả về nội dung (HTML) của file
      })
      .then((data) => {
        // Đưa nội dung HTML vào "chỗ"
        navPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Lỗi khi tải nav:", error);
        navPlaceholder.innerHTML = "<p>Lỗi tải nav</p>"; // Hiển thị lỗi nếu có
      });
  }
  if (footerPlaceholder) {
    fetch("../../components/footer/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải footer");
        }
        return response.text();
      })
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Lỗi khi tải footer:", error);
        footerPlaceholder.innerHTML = "<p>Lỗi tải footer</p>"; // Hiển thị lỗi nếu có
      });
  }
  if (mobileMenuPlaceholder) {
    fetch("../../components/mobileMenu/mobileMenu.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải mobile menu");
        }
        return response.text();
      })
      .then((data) => {
        mobileMenuPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Lỗi khi tải mobile menu:", error);
        mobileMenuPlaceholder.innerHTML = "<p>Lỗi tải mobile menu</p>"; // Hiển thị lỗi nếu có
      });
  }
  if (authenOverlayPlaceholder) {
    fetch("../../components/authenOverlay/authenOverlay.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải authen overlay");
        }
        return response.text();
      })
      .then((data) => {
        authenOverlayPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Lỗi khi tải authen overlay:", error);
        authenOverlayPlaceholder.innerHTML = "<p>Lỗi tải authen overlay</p>"; // Hiển thị lỗi nếu có
      });
  }
});
