import { newsPort } from "../data/newsPost.js";

/**
 * Hàm này sẽ khởi tạo tất cả các trình nghe sự kiện (event listeners)
 * cho trang thêm bài viết mới. Nó chỉ được gọi sau khi toàn bộ HTML đã được tải xong.
 */
function initializeAddPostPage() {
    // Lấy các phần tử DOM cần thiết
    const addPostForm = document.getElementById('addPostForm');
    const postImageInput = document.getElementById('postImage');
    const imagePreviewContainer = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const previewText = document.querySelector('.image-preview p');

    // === 1. XỬ LÝ PREVIEW ẢNH VÀ LƯU TẠM VÀO LOCALSTORAGE ===
    // Chỉ thêm event listener nếu phần tử tồn tại trên trang
    if (postImageInput) {
        postImageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];

            if (!file) {
                return; // Người dùng không chọn file nào
            }

            const reader = new FileReader();

            // Hàm này sẽ chạy sau khi reader đọc file xong
            reader.onload = function (event) {
                const base64String = event.target.result;

                // Hiển thị ảnh preview
                previewImg.src = base64String;
                imagePreviewContainer.classList.add('has-image');
                if (previewText) previewText.style.display = 'none';

                // Lưu base64 vào localStorage để dùng tạm khi submit form
                try {
                    localStorage.setItem('tempPostImage', base64String);
                } catch (error) {
                    console.error("Lỗi khi lưu ảnh:", error);
                    alert("Lỗi: Kích thước ảnh quá lớn để lưu tạm. Vui lòng chọn ảnh nhỏ hơn 5MB.");
                    // Reset lại input và preview nếu lưu thất bại
                    postImageInput.value = ""; // Xóa file đã chọn
                    previewImg.src = "";
                    imagePreviewContainer.classList.remove('has-image');
                    if (previewText) previewText.style.display = 'block';
                }
            };

            // Bắt đầu đọc file ảnh và chuyển nó thành chuỗi Base64
            reader.readAsDataURL(file);
        });
    }

    // === 2. XỬ LÝ SUBMIT FORM ===
    // Chỉ thêm event listener nếu form tồn tại
    if (addPostForm) {
        addPostForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn trang tải lại

            const formData = {
                title: document.getElementById('postTitle').value.trim(),
                category: document.getElementById('postCategory').value,
                author: document.getElementById('postAuthor').value.trim(),
                content: document.getElementById('postContent').value.trim(),
                image: localStorage.getItem('tempPostImage'), // Lấy ảnh base64 đã lưu tạm
                createdAt: new Date().toISOString()
            };

            // --- VALIDATION ---
            if (!formData.title || !formData.author || !formData.category) {
                alert('Vui lòng điền đầy đủ các trường bắt buộc!');
                return;
            }

            if (formData.content.length < 100) {
                alert('Nội dung bài viết phải có ít nhất 100 ký tự!');
                return;
            }

            if (!formData.image) {
                alert('Vui lòng chọn một hình ảnh cho bài viết!');
                return;
            }

            // --- LƯU DỮ LIỆU ---
            const allSaveAddPostData = JSON.parse(localStorage.getItem('saveAddPost')) || [];
            allSaveAddPostData.push(formData);
            localStorage.setItem('saveAddPost', JSON.stringify(allSaveAddPostData));

            // Dọn dẹp ảnh tạm sau khi đã lưu thành công
            localStorage.removeItem('tempPostImage');

            alert('Tạo bài viết thành công! 🎉\n\nTiêu đề: ' + formData.title + '\nDanh mục: ' + formData.category);

            // Reset form và preview ảnh để người dùng có thể tạo bài mới
            addPostForm.reset();
            previewImg.src = '';
            imagePreviewContainer.classList.remove('has-image');
            if (previewText) previewText.style.display = 'block';
        });
    }
}

// === CHẠY CODE SAU KHI HTML ĐÃ TẢI XONG ===
// Lỗi "Cannot read properties of null" xảy ra khi JS chạy trước khi HTML được tạo.
// "DOMContentLoaded" đảm bảo rằng tất cả các phần tử HTML đã sẵn sàng.
document.addEventListener('DOMContentLoaded', initializeAddPostPage);


// === 3. HÀM TẢI VÀ KẾT HỢP DỮ LIỆU (DÙNG CHO CÁC TRANG KHÁC) ===
// Phần này không cần nằm trong DOMContentLoaded vì nó không tương tác với DOM của trang hiện tại.
function loadNews() {
    const localPosts = JSON.parse(localStorage.getItem('saveAddPost')) || [];

    const convertedPosts = localPosts.map((post, index) => ({
        // Tạo ID duy nhất, không bị trùng lặp, và dễ nhận biết
        id: newsPort.length + index + 1,
        description: post.title,
        type: post.category, // Dùng cho mục đích chung

        // SỬA LỖI LOGIC: Gán category vào type1 để bộ lọc ở trang danh sách hoạt động đúng
        type1: post.category,
        type2: 'Latest', // Mọi bài viết mới đều thuộc 'Latest'

        author: post.author,

        // SỬA LỖI LOGIC: Sử dụng ảnh base64 đã lưu từ localStorage
        img: post.image,

        content: `<p>${post.content}</p>`
    }));

    // Kết hợp bài viết mới và bài viết gốc, đưa bài mới nhất lên đầu
    const fullNews = [...convertedPosts.reverse(), ...newsPort];
    return fullNews;
}

// Export dữ liệu đã kết hợp để các module khác có thể import và sử dụng
export let fullNews = loadNews();