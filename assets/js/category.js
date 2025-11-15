import { createArticleCard } from "../../components/articleCard.js";
import { createTrendingCard } from "../../components/trendingCard.js";
import { createRelatedCard } from "../../components/relatedCard.js";
const subtitle = {
  Latest: "Breaking stories, updated live.",
  "Business News": "Corporate headlines and economic updates.",
  "Money and Markets": "Financial flows and market movements.",
  "Tech and Innovation": "Breakthroughs and emerging trends.",
  "A.I.": "The future of Artificial Intelligence.",
  Lifestyle: "Culture, wellness, and modern living.",
  Politics: "The global and national political landscape.",
};
class CategoryPage {
  constructor() {
    // State
    this.category = this.getCategoryFromURL();
    this.currentPage = 1;
    this.perPage = 4;

    this.allArticles = [];
    this.displayedArticles = [];

    this.init();
  }

  /* -----------------------
      INIT LOGIC
  ------------------------ */
  async init() {
    // Show loading states
    this.showTrendingLoading();
    this.showRelatedLoading();

    // Fetch all data
    await Promise.all([
      this.fetchArticles(),
      this.renderTrending(),
      this.loadRelatedArticles(),
    ]);

    this.attachEvents();
  }

  /* -----------------------
      URL CATEGORY
  ------------------------ */
  getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("type") || "category";
  }

  /* -----------------------
      LOAD ARTICLES
  ------------------------ */
  async fetchArticles() {
    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 700));

      // Filter theo category
      this.allArticles = this.getMockArticles().filter((a) =>
        this.category === "all"
          ? true
          : a.category.toLowerCase() === this.category.toLowerCase()
      );

      this.updateHeader();
      this.renderArticles();
    } catch (err) {
      console.error(err);
      this.showEmptyState();
    }
  }

  /* -----------------------
      UPDATE CATEGORY HEADER
  ------------------------ */
  updateHeader() {
    document.getElementById("category-title").textContent =
      this.category.toUpperCase();

    document.getElementById("category-subtitle").textContent =
      subtitle[this.category];

    document.getElementById(
      "article-count"
    ).textContent = `${this.allArticles.length} articles found`;
  }

  /* -----------------------
      RENDER ARTICLE LIST
  ------------------------ */
  renderArticles() {
    const loading = document.getElementById("loading-state");
    const grid = document.getElementById("articles-grid");
    const empty = document.getElementById("empty-state");
    const loadMoreContainer = document.getElementById("load-more-container");

    loading.style.display = "none";

    // Không có bài nào
    if (this.allArticles.length === 0) {
      empty.style.display = "flex";
      return;
    }

    // Lấy bài theo page
    const end = this.currentPage * this.perPage;
    this.displayedArticles = this.allArticles.slice(0, end);

    // Render HTML
    grid.innerHTML = this.displayedArticles
      .map((a) => createArticleCard(a))
      .join("");

    grid.style.display = "flex";
    grid.style.flexDirection = "column"; // ép xếp dọc
    grid.style.gap = "20px";

    // Ẩn hiện nút load more
    loadMoreContainer.style.display =
      this.displayedArticles.length < this.allArticles.length
        ? "block"
        : "none";
  }

  /* -----------------------
  TRENDING - WITH LOADING
------------------------ */
  showTrendingLoading() {
    const list = document.getElementById("trending-list");
    list.innerHTML = `
  <div class="section-loading">
    <div class="loading__spinner"></div>
    <p>Loading trending...</p>
  </div>
`;
  }

  async renderTrending() {
    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 800));

      const list = document.getElementById("trending-list");
      const data = this.getMockTrendingArticles();

      list.innerHTML = data
        .map((a, i) => createTrendingCard(a, i + 1))
        .join("");
    } catch (err) {
      console.error("Error loading trending:", err);
      const list = document.getElementById("trending-list");
      list.innerHTML = `
    <div class="section-error">
      <p>Failed to load trending articles</p>
    </div>
  `;
    }
  }

  /* -----------------------
  RELATED CARD - WITH LOADING
------------------------ */
  showRelatedLoading() {
    const relatedGrid = document.getElementById("you-may-like-grid");
    relatedGrid.innerHTML = `
  <div class="section-loading section-loading--wide">
    <div class="loading__spinner"></div>
    <p>Loading recommendations...</p>
  </div>
`;
  }

  async loadRelatedArticles() {
    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1000));

      const relatedGrid = document.getElementById("you-may-like-grid");
      const otherCategories = this.getOtherCategories();
      const relatedArticles = this.getMockRelatedArticles(otherCategories);

      relatedGrid.innerHTML = relatedArticles
        .map((a) => createRelatedCard(a))
        .join("");
    } catch (err) {
      console.error("Error loading related articles:", err);
      const relatedGrid = document.getElementById("you-may-like-grid");
      relatedGrid.innerHTML = `
    <div class="section-error section-loading--wide">
      <p>Failed to load recommendations</p>
    </div>
  `;
    }
  }

  getOtherCategories() {
    const allCategories = [
      "Latest",
      "Business News",
      "Money and Markets",
      "Tech and Innovation",
      "A.I.",
      "Lifestyle",
      "Politics",
    ];
    const others = allCategories.filter(
      (cat) => cat.toLowerCase() !== this.category.toLowerCase()
    );

    return others.slice(0, 3);
  }
  /* -------------  ----------
      EVENTS
  ------------------------ */
  attachEvents() {
    const btn = document.getElementById("load-more-btn");

    if (!btn) return;

    btn.addEventListener("click", () => {
      this.currentPage++;
      this.renderArticles();

      // Scroll mượt xuống vùng content mới
      setTimeout(() => {
        const cards = document.querySelectorAll(".article__card");
        const anchorIndex = this.displayedArticles.length - this.perPage;

        if (cards[anchorIndex]) {
          cards[anchorIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 120);
    });
  }

  /* -----------------------
      EMPTY STATE
  ------------------------ */
  showEmptyState() {
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("empty-state").style.display = "flex";
  }

  /* -----------------------
      MOCK DATA
  ------------------------ */
  getMockArticles() {
    return [
      {
        id: 1,
        title: "Example Article 1",
        image: "https://picsum.photos/400/300",
        category: "Latest",
        excerpt: "Duma ao vai lon",
        views: 1200,
        url: "#",
        author: "Luc nguyn",
        time: "9 hour ago",
      },
      {
        id: 2,
        title: "Example Article 2",
        image: "https://picsum.photos/400/301",
        category: "Latest",
        views: 840,
        url: "#",
      },
      {
        id: 3,
        title: "Example Article 1",
        image: "https://picsum.photos/400/300",
        category: "Latest",
        views: 1200,
        url: "#",
      },
      {
        id: 4,
        title: "Example Article 2",
        image: "https://picsum.photos/400/301",
        category: "Latest",
        views: 840,
        url: "#",
      },
      {
        id: 5,
        title: "Example Article 1",
        image: "https://picsum.photos/400/300",
        category: "Latest",
        views: 1200,
        url: "#",
      },
      {
        id: 6,
        title: "Example Article 2",
        image: "https://picsum.photos/400/301",
        category: "Latest",
        views: 840,
        url: "#",
      },
      {
        id: 7,
        title: "Example Article 1",
        image: "https://picsum.photos/400/300",
        category: "Latest",
        views: 1200,
        url: "#",
      },
      {
        id: 8,
        title: "Example Article 2",
        image: "https://picsum.photos/400/301",
        category: "Latest",
        views: 840,
        url: "#",
      },
      {
        id: 9,
        title: "Example Article 1",
        image: "https://picsum.photos/400/300",
        category: "Latest",
        views: 1200,
        url: "#",
      },
      {
        id: 10,
        title: "Example Article 2",
        image: "https://picsum.photos/400/301",
        category: "Latest",
        views: 840,
        url: "#",
      },
    ]; // giữ nguyên mock data của bạn
  }

  getMockTrendingArticles() {
    return [
      {
        id: 11,
        title:
          " Trending 1 Trending 1 Trending 1 Trending 1 Trending 1 Trending 1",
        image: "https://picsum.photos/500/300",
        views: 3000,
        url: "#",
      },
      {
        id: 12,
        title: "Trending 2",
        image: "https://picsum.photos/500/301",
        views: 2500,
        url: "#",
      },
    ]; // giữ nguyên mock trending của bạn
  }
  getMockRelatedArticles(categories) {
    console.log("Runned");
    // Mock data for each category - Replace with actual API call
    const articlesByCategory = {
      Latest: [
        {
          category: "Latest",
          title: "Emerging Markets Show Strong Growth Potential",
          image: "",
          time: "1 day ago",
          author: "Alex Thompson",
          url: "#",
        },
      ],
      "Business News": [
        {
          category: "Business News",
          title: "Quantum Computing Breakthrough Announced",
          image: "",
          time: "2 days ago",
          author: "Jennifer Lee",
          url: "#",
        },
      ],
      Politics: [
        {
          category: "Politics",
          title: "Global Summit Outcomes and Policy Changes",
          image: "",
          time: "3 days ago",
          author: "Robert Zhang",
          url: "#",
        },
      ],
      Lifestyle: [
        {
          category: "Lifestyle",
          title: "Top 10 Wellness Trends for Modern Living",
          image: "",
          time: "1 day ago",
          author: "Maria Garcia",
          url: "#",
        },
      ],
      "Money and Markets": [
        {
          category: "Money and Markets",
          title: "Championship Finals: Highlights and Analysis",
          image: "",
          time: "5 hours ago",
          author: "Tom Wilson",
          url: "#",
        },
      ],
      "Tech and Innovation": [
        {
          category: "Tech and Innovation",
          title: "Award Season: Winners and Memorable Moments",
          image: "",
          time: "1 day ago",
          author: "Lisa Chen",
          url: "#",
        },
      ],
      "A.I.": [
        {
          category: "A.I.",
          title: "Award Season: Winners and Memorable Moments",
          image: "",
          time: "1 day ago",
          author: "Lisa Chen",
          url: "#",
        },
      ],
    };

    // Get one article from each of the 3 categories
    return categories
      .map(
        (cat) =>
          articlesByCategory[cat] || articlesByCategory["Tech and Innovation"]
      )
      .flat();
  }
}

/* -----------------------
    INIT CLASS
------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  new CategoryPage();
});
