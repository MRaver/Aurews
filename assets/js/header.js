// Types mapping - map text từ HTML đến type parameter
const typeMapping = {
    'Home': null, // Home không có type
    'Latest': 'Latest',
    'Business News': 'Business News',
    'Money & Markets': 'Money and Markets',
    'Money and Markets': 'Money and Markets',
    'Tech & Innovation': 'Tech and Innovation',
    'Tech and Innovation': 'Tech and Innovation',
    'A.I.': 'A.I.',
    'Lifestyle': 'Lifestyle',
    'Politics': 'Politics',
    'Email': 'Email',
    'Podcast': 'Podcast',
    'Contact': null // Contact là trang riêng
};

const types = [
    'Latest', 'Business News', 'Money and Markets', 'Tech and Innovation',
    'A.I.', 'Lifestyle', 'Politics', 'Email', 'Podcast'
];

function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (!mobileMenu || !overlay) return;

    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Set active class cho mobile menu dựa trên URL hiện tại (giống toggleNav)
function toggleMobileNav() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('type');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const currentPath = window.location.pathname;

    if (mobileNavLinks.length === 0) return;

    // Reset all active classes
    mobileNavLinks.forEach(link => link.classList.remove('active'));

    // Set active cho Home nếu đang ở Index.html
    if (currentPath.includes('Index.html') || currentPath.endsWith('/') ||
        currentPath.includes('index.html') || (!currentPath.includes('Category.html') && !currentPath.includes('Post.html') && !currentPath.includes('Contact.html'))) {
        const homeLink = Array.from(mobileNavLinks).find(link =>
            link.textContent.trim() === 'Home' || link.getAttribute('href')?.includes('Index.html')
        );
        if (homeLink) {
            homeLink.classList.add('active');
        }
        return;
    }

    // Set active cho category dựa trên type parameter
    if (param) {
        mobileNavLinks.forEach(link => {
            const linkText = link.textContent.trim();
            const mappedType = typeMapping[linkText];

            if (mappedType === param) {
                link.classList.add('active');
            }
        });
    }

    // Set active cho Contact nếu đang ở Contact.html
    if (currentPath.includes('Contact.html')) {
        const contactLink = Array.from(mobileNavLinks).find(link =>
            link.textContent.trim() === 'Contact'
        );
        if (contactLink) {
            contactLink.classList.add('active');
        }
    }
}

// Khởi tạo URLs cho mobile menu links nếu chưa có
function initMobileMenuLinks() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    if (mobileNavLinks.length === 0) return;

    // Tất cả các file HTML đều ở trong thư mục pages, nên dùng relative path
    // Kiểm tra xem có đang ở trong thư mục pages không để xác định base path
    const currentPath = window.location.pathname;
    let basePath = '.';

    // Nếu không ở trong pages (ví dụ ở root), cần vào pages
    if (!currentPath.includes('/pages/') && !currentPath.includes('/pages')) {
        // Có thể đang ở root, thử dùng absolute path hoặc relative
        // Nhưng vì tất cả HTML files đều ở trong pages, nên giả định đang ở pages
        basePath = '.';
    }

    mobileNavLinks.forEach((link) => {
        const linkText = link.textContent.trim();
        const currentHref = link.getAttribute('href');

        // Chỉ set URL nếu href là "#" hoặc rỗng hoặc không hợp lệ
        if (!currentHref || currentHref === '#' || currentHref.trim() === '') {
            if (linkText === 'Home') {
                link.href = './Index.html';
            } else if (linkText === 'Contact') {
                link.href = './Contact.html';
            } else {
                // Lấy type từ mapping
                const type = typeMapping[linkText];
                if (type) {
                    link.href = `./Category.html?type=${encodeURIComponent(type)}`;
                }
            }
        }
    });
}

// Khởi tạo mobile menu
function initMobileMenu() {
    // Khởi tạo URLs cho mobile menu
    initMobileMenuLinks();

    // Set active class ban đầu
    toggleMobileNav();

    // Handle click on mobile menu links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Chỉ prevent default nếu href là "#" hoặc rỗng
            if (!href || href === '#' || href.startsWith('#')) {
                e.preventDefault();
                return;
            }

            // Prevent default để tự điều hướng
            e.preventDefault();

            // Đóng menu trước khi điều hướng (UX tốt hơn)
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }

            // Điều hướng đến trang mới
            window.location.href = href;
        });
    });
}

// Khởi tạo khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    // DOM đã sẵn sàng
    initMobileMenu();
}

// Close menu on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// Make toggleMenu available globally
window.toggleMenu = toggleMenu;
