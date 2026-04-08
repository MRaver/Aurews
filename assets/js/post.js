import { newsPort } from "../data/newsPost.js";
import { fullNews } from "./addPost.js";

// Lấy ID từ URL parameter
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id ? parseInt(id) : 1;
}

// ============================================================
// SEO: Cập nhật động meta title, description, canonical, OG,
//      breadcrumb và Schema sau khi biết bài viết cụ thể
// ============================================================
function updateSEOMeta(article) {
  const BASE_URL = "https://aurews.com";
  const postURL = `${BASE_URL}/pages/post.html?id=${article.id}`;

  // Title
  document.title = `${article.description} | Aurews`;

  // Meta description (dùng 155 ký tự đầu của content nếu không có summary)
  const rawDescription = article.summary
    || (article.content ? article.content.replace(/<[^>]*>/g, "").slice(0, 155) : "")
    || `Read the latest ${article.type} news on Aurews.`;
  const metaDesc = document.getElementById("meta-description");
  if (metaDesc) metaDesc.setAttribute("content", rawDescription);

  // Author
  const metaAuthor = document.getElementById("meta-author");
  if (metaAuthor) metaAuthor.setAttribute("content", article.author || "Aurews Editorial");

  // Canonical
  const canonical = document.getElementById("canonical-tag");
  if (canonical) canonical.setAttribute("href", postURL);

  // Open Graph
  const setOG = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("content", val);
  };
  setOG("og-title",       `${article.description} | Aurews`);
  setOG("og-description", rawDescription);
  setOG("og-url",         postURL);
  setOG("og-image",       article.img ? `${BASE_URL}/${article.img}` : `${BASE_URL}/assets/img/screenshot.png`);

  // Schema NewsArticle
  const schemaEl = document.getElementById("schema-article");
  if (schemaEl) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.description,
      "url": postURL,
      "datePublished": article.date || "2025-09-10",
      "image": article.img ? `${BASE_URL}/${article.img}` : `${BASE_URL}/assets/img/screenshot.png`,
      "author": {
        "@type": "Person",
        "name": article.author || "Aurews Editorial"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aurews",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/assets/img/favicon.png`
        }
      },
      "articleSection": article.type || "",
      "description": rawDescription
    };
    schemaEl.textContent = JSON.stringify(schema);
  }

  // Breadcrumb: cập nhật link category và tên bài
  const breadcrumbCat = document.getElementById("breadcrumb-category");
  if (breadcrumbCat && article.type) {
    breadcrumbCat.setAttribute("href", `category.html?type=${article.type}`);
    breadcrumbCat.textContent = article.type;
  }
  const breadcrumbTitle = document.getElementById("breadcrumb-title");
  if (breadcrumbTitle) {
    // Rút ngắn nếu title quá dài
    breadcrumbTitle.textContent = article.description.length > 60
      ? article.description.slice(0, 57) + "..."
      : article.description;
  }
}

export function renderNewsPortTitle() {
  const container = document.querySelector(".js-title-container");
  const postId = getPostIdFromURL();
  const article = fullNews.find((item) => item.id === postId) || fullNews[0];

  container.innerHTML = `
     <p>${article.type} • 2 min read</p>
            <h1>${article.description}</h1>
            <p>12 hr ago</p>
            <p>&nbsp;&nbsp;|&nbsp; PUBLISHED Sep 10, 2025, 12:00 PM ET</p>
            <p class="author-info">By <span class="logo"></span><span class="author-name"><u>${article.author}</u></span>
            </p>`;

  // SEO update ngay sau khi biết article
  updateSEOMeta(article);
}

export function renderNewsPortContent() {
  const container = document.querySelector(".js-new-content-container");
  const postId = getPostIdFromURL();
  const article = fullNews.find((item) => item.id === postId) || newsPort[0];

  container.innerHTML = `
        <figure>
            <div class="news__content-img">
                <img src="${article.img}" alt="${article.description}" height="420px" width="670px">
            </div>
            <figcaption class="img-caption">
               ${article.imgCaption}
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
                        <a href="#" aria-label="Share via email"><i class="fas fa-envelope"></i></a>
                        <a href="#" aria-label="Copy link"><i class="fas fa-link"></i></a>
                        <a href="#" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Share on Instagram"><i class="fab fa-instagram"></i></a>
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
    `;
}

function renderContentWrapper() {
  const first = fullNews.slice(0, fullNews.length / 2);
  const second = fullNews.slice(fullNews.length / 2, fullNews.length);
  const container = document.querySelector(".articles-grid");
  const skipIndex = Math.floor(Math.random() * first.length);

  const selected = [];
  first.some((item, index) => {
    if (index === skipIndex) return false;
    selected.push(item);
    return selected.length === 4;
  });

  // SEO: dùng <a href> thay vì onclick thuần để Google crawl được
  container.innerHTML = selected
    .map(
      (article) => `
    <a href="./post.html?id=${article.id}" class="article-card" style="text-decoration:none; color:inherit; display:block; cursor:pointer;">
        <div class="article-image" style="background-image: url('${article.img}')" role="img" aria-label="${article.description}"></div>
        <h3 class="article-title">${article.description}</h3>
        <p class="article-meta">2 min read</p>
    </a>
`
    )
    .join("");

  const containerTwo = document.querySelector(".most-read-list");
  const skipIndex2 = Math.floor(Math.random() * second.length);
  const selected2 = [];
  second.some((item2, index2) => {
    if (index2 === skipIndex2) return false;
    selected2.push(item2);
    return selected2.length === 6;
  });

  // SEO: dùng <a href> thay vì onclick thuần
  containerTwo.innerHTML = selected2
    .map(
      (article, index) => `
         <li class="most-read-item">
            <span class="most-read-number">${index + 1}</span>
            <a href="./post.html?id=${article.id}" class="most-read-title" style="text-decoration:none; color:inherit;">
              ${article.description}
            </a>
        </li>
    `
    )
    .join("");
}

// Chạy khi DOM đã load
document.addEventListener("DOMContentLoaded", () => {
  renderNewsPortTitle();
  renderNewsPortContent();
  renderContentWrapper();
});
