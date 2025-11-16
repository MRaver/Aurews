import { newsPort } from "../data/newsPost.js";
import { fullNews } from "./addPost.js";
import { createArticleCard } from "../../components/Category/articleCard.js";
import { createTrendingCard } from "../../components/Category/trendingCard.js";
import { createRelatedCard } from "../../components/Category/relatedCard.js";
const subtitle = {
  Latest: "Breaking stories, updated live.",
  "Business News": "Corporate headlines and economic updates.",
  "Money and Markets": "Financial flows and market movements.",
  "Tech and Innovation": "Breakthroughs and emerging trends.",
  "A.I.": "The future of Artificial Intelligence.",
  Lifestyle: "Culture, wellness, and modern living.",
  Politics: "The global and national political landscape.",
};

export function getType() {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("type");
  return param;
}

export const types = [
  "Latest",
  "Business News",
  "Money and Markets",
  "Tech and Innovation",
  "A.I.",
  "Lifestyle",
  "Politics",
  "Email",
  "Podcast",
];

export function toggleNav() {
  const param = getType();
  const navContainer = document.querySelectorAll(".nav__categories a");

  navContainer.forEach((link) => {
    link.classList.remove("active"); // Xóa active từ tất cả
    const href = link.getAttribute("href");

    // Kiểm tra xem href có chứa type param không
    if (href.includes(`type=${param}`)) {
      link.classList.add("active");
    }
  });
}

function renderCategory() {
  const newsTitle = document.querySelector(".js-title-container");
  const newsContainer = document.querySelector(".js-news-container");
  const data = fullNews; // Sử dụng fullNews đã bao gồm bài mới
  const param = getType();

  // Lọc tin phù hợp (logic này vẫn đúng)
  const filtered = data.filter(
    (news) =>
      news.type === param || news.type1 === param || news.type2 === param
  );

  // SỬA LỖI LOGIC TẠI ĐÂY: Thêm data-id vào thẻ div
  const html = filtered.map((newsShow) => createArticleCard(newsShow)).join("");

  if (newsTitle) {
    newsTitle.innerHTML = `<div class="title__container js-title-container">
                <h1>${param}</h1>
                <p>${subtitle[param]}</p>
            </div>`;
  }

  if (newsContainer) {
    newsContainer.innerHTML = html || "<p>No articles found.</p>";
  }
}

function onClickHandler() {
  // SỬA LỖI LOGIC TẠI ĐÂY: Đơn giản hóa hoàn toàn
  const newsContainer = document.querySelector(".js-news-container");
  if (!newsContainer) return; // Nếu không có container, thoát an toàn

  newsContainer.addEventListener("click", function (event) {
    // Tìm phần tử .new__box gần nhất với phần tử được click
    const clickedBox = event.target.closest(".new__box");

    if (clickedBox) {
      const newsId = clickedBox.dataset.id; // Lấy id từ data-id
      if (newsId) {
        // Kiểm tra xem ID có phải là của bài viết local hay không
        if (String(newsId).startsWith("local-")) {
          // Nếu là bài viết local, ta cần xử lý khác hoặc lưu ID vào session/local storage để trang Post.html đọc
          localStorage.setItem("selectedPostId", newsId);
          window.location.href = `./Post.html?type=local`;
        } else {
          window.location.href = `./Post.html?id=${newsId}`;
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategory();
  onClickHandler();
  toggleNav();
});
