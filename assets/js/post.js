import { newsPort } from "../data/newsPost.js";

// Lấy ID từ URL parameter
function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id ? parseInt(id) : 1; // Default to post 1 if no ID provided
}

function renderNewsPortContent() {
    const container = document.querySelector('.js-new-content-container');
    const postId = getPostIdFromURL();

    // Tìm article theo ID
    const article = newsPort.find(item => item.id === postId) || newsPort[0]; // Default to first if not found

    container.innerHTML = `<figure>
                <div class="news__content-img">
                    <img src="/client/assets/${article.img}" alt="" height="420px" width="670px">
                </div>
                <figcaption>
                    <p>caption</p>
                </figcaption>
            </figure>
            ${article.content}
            <div class="comment-section">
                <div class="comment-header">
                    <div class="header-left">
                        <div class="black-bar">
                        </div>
                        <h2>COMMENTS</h2>
                    </div>
                    <div class="social-icons">
                        <a href="#"><i class="fas fa-envelope"></i></a>
                        <a href="#"><i class="fas fa-link"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div class="comment-list">
                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">John Doe</span>
                                <p>Amazing good job iem</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">Jây 97</span>
                                <p>Thiên lý ơi</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">Dé Soltuné Montepré</span>
                                <p>Cet endroit vous a</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>
                </div>

                <div class="comment-form">
                    <button class="comment-button">Leave your comment here</button>
                </div>
            </div>
    `
}

function renderNewsPortTitle() {
    const container = document.querySelector('.js-title-container');
    const postId = getPostIdFromURL();

    // Tìm article theo ID
    const article = newsPort.find(item => item.id === postId) || newsPort[0]; // Default to first if not found

    container.innerHTML = `
     <p>${article.type} • 2 min read</p>
            <h1>${article.description}</h1>
            <p>12 hr ago</p>
            <p>&nbsp;&nbsp;|&nbsp; PUBLISHED Sep 10, 2025, 12:00 PM ET</p>
            <p class="author-info">By <span class="logo"></span><span class="author-name"><u>${article.author}</u></span>
            </p>`
}

// Chạy khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    renderNewsPortTitle();
    renderNewsPortContent();
});