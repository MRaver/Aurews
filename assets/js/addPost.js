
// Image Preview
document.getElementById('postImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const preview = document.getElementById('imagePreview');
            const img = document.getElementById('previewImg');
            img.src = event.target.result;
            preview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    }
});

// Form Submit Handler
const allSaveAddPostData = JSON.parse(localStorage.getItem('saveAddPost')) || [];

document.getElementById('addPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('postTitle').value.trim(),
        category: document.getElementById('postCategory').value,
        author: document.getElementById('postAuthor').value.trim(),
        content: document.getElementById('postContent').value.trim(),
        image: document.getElementById('postImage').files[0],
        createdAt: new Date().toISOString()
    };

    // Validation
    if (formData.content.length < 100) {
        alert('Post content must be at least 100 characters long!');
        return;
    }

    if (formData) {
        // In thực tế, bạn sẽ gửi data này lên backend
        allSaveAddPostData.push(formData);
        localStorage.setItem('saveAddPost', allSaveAddPostData);
    }


    // Giả lập lưu vào memory (thay thế localStorage)
    alert('Post created successfully! 🎉\n\nTitle: ' + formData.title + '\nCategory: ' + formData.category);

    // Redirect về trang chủ
    // window.location.href = 'Index.html';
});