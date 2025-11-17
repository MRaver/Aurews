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
    width: 240px;
    height: 100%;
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
    font-size: 24px;
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

/* Responsive: stack image above content on narrow screens (e.g. iPhone SE 375x667) */
@media (max-width: 500px) {
  .article-card {
    flex-direction: column;
    align-items: stretch;
  }

  .article-card__image {
    width: 100%;
    flex: 0 0 auto;
  }

  .article-card__image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .article-card__content {
    padding: 12px;
  }

  .article-card__title {
    font-size: 18px;
    margin: 0 0 8px 0;
  }

  .article-card__excerpt {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .article-card__meta {
    font-size: 12px;
    gap: 8px;
  }

  .article-card {
    border-radius: 10px;
  }
}
`;

function injectStyles() {
  if (document.getElementById("article-card-style")) return;

  const style = document.createElement("style");
  style.id = "article-card-style";
  style.textContent = styles;
  document.head.appendChild(style);
}
function truncateSimple(str, n = 30) {
  return str.length <= n ? str : str.slice(0, n) + "...";
}
export function createArticleCard(article) {
  injectStyles();

  const imageHTML = article.img
    ? `<img src="${article.img}" alt="${article.title}" class="post-card__image" />`
    : `<div style="width:100%;height:180px;background:#ddd"></div>`;

  return `
  <article class="article-card" data-id="${
    article.id
  }" onclick="window.location.href='Post.html?id=${article.id}'">
  <div class="article-card__image">
    ${imageHTML}
  </div>

  <div class="article-card__content">
    <div>
      <div class="article-card__category">${article.type}</div>
      <h2 class="article-card__title">${article.description}</h2>
      <h3 class="article-card__excerpt">${truncateSimple(
        article.content,
        100
      )}</h3>
    </div>

    <div class="article-card__meta">
      <span>9:53 11-17-2025 </span>
      <span>by ${article.author}</span>
    </div>
  </div>
</article>
    `;
}
