import { fullNews } from "./addPost.js";
import { createArticleCard } from "../../components/Category/ArticleCard/articleCard.js";
import { createRelatedCard } from "../../components/Category/RelatedCard/relatedCard.js";
import { toggleMenu } from "./header.js";

const subtitle = {
  latest: "Breaking stories, updated live.",
  "business news": "Corporate headlines and economic updates.",
  "money and markets": "Financial flows and market movements.",
  "tech and innovation": "Breakthroughs and emerging trends.",
  "a.i.": "The future of Artificial Intelligence.",
  lifestyle: "Culture, wellness, and modern living.",
  politics: "The global and national political landscape.",
};

// ============================================================
// SEO: Map category → meta description chuẩn
// ============================================================
const categoryMeta = {
  "business news":      "Browse the latest Business News articles on Aurews. Corporate headlines, company updates, and economic analysis.",
  "money and markets":  "Follow the latest Money & Markets news on Aurews. Stock market updates, financial flows, and investment insights.",
  "tech and innovation":"Explore Tech & Innovation stories on Aurews. Breakthroughs, startups, and emerging technology trends.",
  "a.i.":               "Read the latest Artificial Intelligence news on Aurews. AI research, products, and the future of machine learning.",
  "lifestyle":          "Discover Lifestyle articles on Aurews. Culture, wellness, travel, and modern living.",
  "politics":           "Stay informed with Politics coverage on Aurews. Global and national political news and analysis.",
  "latest":             "The latest breaking news from Aurews. Updated live with top stories across all categories.",
};

export function getType() {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("type");
  return param;
}

// ============================================================
// SEO: Override title, description, canonical, OG theo category
// ============================================================
function updateCategorySEO(category) {
  if (!category) return;

  const BASE_URL = "https://aurews.com";
  const catKey = category.toLowerCase();
  const catDisplay = category.charAt(0).toUpperCase() + category.slice(1);
  const catURL = `${BASE_URL}/pages/category.html?type=${encodeURIComponent(category)}`;

  // Title
  document.title = `${catDisplay} – Latest Updates | Aurews`;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", categoryMeta[catKey] || `Browse ${catDisplay} articles on Aurews.`);

  // Canonical
  const canonical = document.getElementById("canonical-tag");
  if (canonical) canonical.setAttribute("href", catURL);

  // Open Graph
  const ogTitle = document.getElementById("og-title");
  if (ogTitle) ogTitle.setAttribute("content", `${catDisplay} – Latest Updates | Aurews`);
  const ogDesc = document.getElementById("og-description");
  if (ogDesc) ogDesc.setAttribute("content", categoryMeta[catKey] || `Browse ${catDisplay} articles on Aurews.`);
  const ogURL = document.getElementById("og-url");
  if (ogURL) ogURL.setAttribute("content", catURL);

  // Schema CollectionPage
  const schemaEl = document.getElementById("schema-category");
  if (schemaEl) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${catDisplay} – Latest Updates | Aurews`,
      "url": catURL,
      "description": categoryMeta[catKey] || `Browse ${catDisplay} articles on Aurews.`,
      "publisher": {
        "@type": "Organization",
        "name": "Aurews",
        "url": BASE_URL
      }
    };
    schemaEl.textContent = JSON.stringify(schema);
  }
}

export function toggleNav() {
  const param = getType();
  const navContainer = document.querySelectorAll(".nav__categories a");
  const currentPath = window.location.pathname.toLocaleLowerCase();
  navContainer.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (href.includes(`type=${param}`)) {
      link.classList.add("active");
    }

    if (
      !param &&
      (href.includes("Index.html") ||
        href.endsWith("/") ||
        href.includes("index.html"))
    ) {
      link.classList.add("active");
    }
    if (
      currentPath.includes("contact.html") ||
      currentPath.includes("post.html") ||
      currentPath.includes("search.html") ||
      currentPath.includes("about.html")
    ) {
      link.classList.remove("active");
    }
  });
}

class CategoryPage {
  constructor() {
    this.category = getType();
    this.currentPage = 1;
    this.perPage = 4;
    this.allArticles = [];
    this.displayedArticles = [];
    this.init();
  }

  async init() {
    this.showTrendingLoading();
    this.showRelatedLoading();
    await Promise.all([
      this.fetchArticles(),
      this.loadRelatedArticles(),
    ]);
    this.attachEvents();
  }

  updateHeader() {
    if (!this.category) return;

    const titleContainer = document.querySelector("#category-title");
    if (titleContainer) titleContainer.innerHTML = this.category.toUpperCase();

    const subtitleContainer = document.querySelector("#category-subtitle");
    if (subtitleContainer) {
      const categoryKey = this.category.toLocaleLowerCase();
      subtitleContainer.innerHTML = subtitle[categoryKey] || "";
    }

    // SEO: cập nhật sidebar "Other Topics" — bỏ link của category hiện tại
    const otherTopicsLinks = document.querySelectorAll(".sidebar__container nav a");
    otherTopicsLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes(encodeURIComponent(this.category)) || href.includes(this.category)) {
        link.style.fontWeight = "bold";
        link.setAttribute("aria-current", "page");
      }
    });
  }

  async fetchArticles() {
    try {
      if (!this.category) {
        this.showEmptyState();
        return;
      }

      await new Promise((res) => setTimeout(res, 700));

      this.allArticles = fullNews.filter(
        (a) =>
          a.type === this.category ||
          a.type1 === this.category ||
          a.type2 === this.category
      );

      // SEO: override meta sau khi biết category
      updateCategorySEO(this.category);

      this.updateHeader();
      this.renderArticles();
    } catch (err) {
      console.error(err);
      this.showEmptyState();
    }
  }

  renderArticles() {
    const loading = document.getElementById("loading-state");
    const grid = document.getElementById("articles-grid");
    const empty = document.getElementById("empty-state");
    const loadMoreContainer = document.getElementById("load-more-container");

    if (loading) loading.style.display = "none";

    if (this.allArticles.length === 0) {
      if (empty) empty.style.display = "flex";
      return;
    }

    const end = this.currentPage * this.perPage;
    this.displayedArticles = this.allArticles.slice(0, end);

    if (grid) {
      grid.innerHTML = this.displayedArticles
        .map((a) => createArticleCard(a))
        .join("");

      grid.style.display = "flex";
      grid.style.flexDirection = "column";
      grid.style.gap = "20px";
    }

    if (loadMoreContainer) {
      loadMoreContainer.style.display =
        this.displayedArticles.length < this.allArticles.length
          ? "block"
          : "none";
    }
  }

  showTrendingLoading() {
    const list = document.getElementById("trending-list");
    if (!list) return;
    list.innerHTML = `
    <div class="section-loading">
      <div class="loading__spinner"></div>
      <p>Loading trending...</p>
    </div>
  `;
  }

  showRelatedLoading() {
    const relatedGrid = document.getElementById("you-may-like-grid");
    if (!relatedGrid) return;
    relatedGrid.innerHTML = `
    <div class="section-loading section-loading--wide">
      <div class="loading__spinner"></div>
      <p>Loading recommendations...</p>
    </div>
  `;
  }

  getOrtherNews() {
    const filtered = fullNews.filter((a) => !this.allArticles.includes(a));
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  async loadRelatedArticles() {
    try {
      if (!this.category) return;

      await new Promise((res) => setTimeout(res, 1000));

      const relatedGrid = document.getElementById("you-may-like-grid");
      if (!relatedGrid) return;

      const relatedArticles = this.getOrtherNews();
      relatedGrid.innerHTML = relatedArticles
        .map((a) => createRelatedCard(a))
        .join("");
    } catch (err) {
      console.error("Error loading related articles:", err);
      const relatedGrid = document.getElementById("you-may-like-grid");
      if (!relatedGrid) return;
      relatedGrid.innerHTML = `
      <div class="section-error section-loading--wide">
        <p>Failed to load recommendations</p>
      </div>
    `;
    }
  }

  attachEvents() {
    const btn = document.getElementById("load-more-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.currentPage++;
      this.renderArticles();

      setTimeout(() => {
        const cards = document.querySelectorAll(".article-card");
        const anchorIndex =
          this.displayedArticles.length % 4 === 0
            ? this.displayedArticles.length - this.perPage
            : this.displayedArticles.length -
              (this.displayedArticles.length % 4);

        if (cards[anchorIndex]) {
          cards[anchorIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    });
  }

  showEmptyState() {
    const loadingState = document.getElementById("loading-state");
    if (loadingState) loadingState.style.display = "none";
    const emptyState = document.getElementById("empty-state");
    if (emptyState) emptyState.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CategoryPage();
  toggleNav();
});
window.toggleMenu = toggleMenu;
