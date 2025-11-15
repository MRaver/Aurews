const styles = `
.article-card {
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #eee;
    cursor: pointer;
    background: #fff;
    transition: 0.2s ease;
}

.article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.article-card__image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #f1f1f1;
}

.article-card__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.article-card__category {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.6;
    margin-bottom: 6px;
}

.article-card__title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px 0;
    line-height: 1.3;
}

.article-card__excerpt {
    font-size: 14px;
    opacity: 0.85;
    margin-bottom: 12px;
}

.article-card__meta {
    font-size: 13px;
    opacity: 0.6;
    display: flex;
    gap: 10px;
}
.article-card__meta span + span {
    /* Tạo đường kẻ bên trái */
    border-left: 2px solid #cccccc; /* 1px độ dày, nét liền, màu xám nhạt */
    
    /* Thêm khoảng cách đệm bên trái để chữ không dính vào đường kẻ */
    padding-left: 10px; 
}

`;

function injectStyles() {
  if (document.getElementById("article-card-style")) return;

  const style = document.createElement("style");
  style.id = "article-card-style";
  style.textContent = styles;
  document.head.appendChild(style);
}

export function createArticleCard(article) {
  injectStyles();

  const imageHTML = article.image
    ? `<img src="${article.image}" alt="${article.title}" class="post-card__image" />`
    : `<div style="width:100%;height:180px;background:#ddd"></div>`;

  return `
  <article class="article-card" onclick="window.location.href='${article.url}'">
  <div class="article-card__image">
    ${imageHTML}
  </div>

  <div class="article-card__content">
    <div>
      <div class="article-card__category">${article.category}</div>
      <h3 class="article-card__title">${article.title}</h3>
      <p class="article-card__excerpt">${article.excerpt}</p>
    </div>

    <div class="article-card__meta">
      <span>${article.time}</span>
      <span>by ${article.author}</span>
    </div>
  </div>
</article>
    `;
}
