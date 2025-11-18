(function () {
    // Lấy phần tử overlay
    const overlay = document.getElementById('page-overlay');

    // Hàm ẩn overlay
    function hideOverlay() {
        if (overlay) {
            overlay.classList.add('hidden');
        }

    }

    // Hàm hiện overlay
    function showOverlay() {
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    // --- Logic chính ---

    // 1. Ẩn overlay khi trang đã tải xong hoàn toàn
    // Sự kiện 'load' đảm bảo tất cả tài nguyên (hình ảnh, css,...) đã được tải.
    window.addEventListener('load', hideOverlay);

    // 2. Hiển thị overlay khi người dùng chuẩn bị rời khỏi trang
    // Sự kiện 'beforeunload' được kích hoạt khi người dùng nhấp vào một liên kết,
    // gửi một biểu mẫu (form), hoặc làm mới trang.
    window.addEventListener('beforeunload', showOverlay);

    // Xử lý đặc biệt cho các trình duyệt cache lại trang (ví dụ: Safari)
    // Sự kiện 'pageshow' được kích hoạt khi người dùng điều hướng tới trang,
    // bao gồm cả khi quay lại bằng nút back/forward.
    window.addEventListener('pageshow', function (event) {
        // event.persisted là true nếu trang được tải từ cache
        if (event.persisted) {
            hideOverlay();
        }
    });
})();