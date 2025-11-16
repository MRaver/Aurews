import { newsPort } from "../data/newsPost.js";
import { fullNews } from "./addPost.js";
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

  navContainer.forEach(link => {
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
  const html = filtered
    .map(
      (newsShow) => `
    <div class="new__box" data-id="${newsShow.id}">
        <div class="img">
            <img src="${newsShow.img || "path/to/default/image.jpg"}" alt="">
        </div>
        <div class="grow">
            <h2>${newsShow.description}</h2>
            <p>By ${newsShow.author || "Clark Kent"}</p>
            <p>Publish Monday 11:02 PM</p>
        </div>
    </div>
`
    )
    .join("");

  if (newsTitle) {
    newsTitle.innerHTML = `<div class="title__container js-title-container">
                <h1>${param}</h1>
                <p>In-depth coverage and articles from Aurews about ${param}</p>
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
