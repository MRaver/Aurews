function injectStyles() {
  if (document.getElementById("article-card-style")) return;

  const link = document.createElement("link");
  link.id = "article-card-style";
  link.href = "../components/Category/ArticleCard/articleCard.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function truncateSimple(str, n = 30) {
  if (!str) return "";
  // Strip HTML tags trước khi truncate (content có thể chứa HTML)
  const plain = str.replace(/<[^>]*>/g, "");
  return plain.length <= n ? plain : plain.slice(0, n) + "...";
}

export function createArticleCard(article) {
  injectStyles();

  // SEO: alt text dùng description (title của bài) thay vì article.title có thể undefined
  const imageHTML = article.img
    ? `<img src="${article.img}" alt="${article.description}" class="post-card__image" loading="lazy" />`
    : `<div style="width:100%;height:180px;background:#ddd" role="img" aria-label="No image available"></div>`;

  // SEO: bọc toàn bộ card bằng <a href> thay vì onclick
  // Googlebot không chạy JS nên onclick không được crawl,
  // nhưng <a href> thì luôn được index và truyền link juice
  return `
  <a href="post.html?id=${article.id}" class="article-card" data-id="${article.id}" style="text-decoration:none; color:inherit; display:block;">
    <article>
      <div class="article-card__image">
        ${imageHTML}
      </div>

      <div class="article-card__content">
        <div>
          <div class="article-card__category">${article.type}</div>
          <h2 class="article-card__title">${article.description}</h2>
          <h3 class="article-card__excerpt">${truncateSimple(article.content, 100)}</h3>
        </div>

        <div class="article-card__meta">
          <span>9:53 11-17-2025</span>
          <span>by ${article.author}</span>
        </div>
      </div>
    </article>
  </a>
    `;
}
