import { newsData } from "../data/newsData.js";
import { toggleMenu } from "./header.js";

// 1. Render Featured News
function renderFeatured() {
  const { title, description, image } = newsData.featured;
  document.querySelector('.boxupperleft__img img').src = `../assets/${image}`;
  // SEO: alt text mô tả ảnh
  document.querySelector('.boxupperleft__img img').alt = title;
  document.querySelector('.boxupperleft__description h1').textContent = title;
  document.querySelector('.boxupperleft__description p').textContent = description;
}

// 2. Render Latest News
function renderLatest() {
  const container = document.querySelector('.latestnews');
  // SEO: dùng <a href> thay vì div + onclick để Google crawl được link
  container.innerHTML = newsData.latest.map(item => `
  <a href="./post.html?id=${item.id}" class="latest-new" style="text-decoration:none; color:inherit; display:block;">
    <h2>${item.title}</h2>
    <p>${item.time}</p>
  </a>
    `).join('');
}

// 3. Render Three News
function renderThreeNews() {
  const container = document.querySelector('.threenews');
  // SEO: dùng <a href> + alt text cho ảnh
  container.innerHTML = newsData.threeNews.map(item => `
    <a href="./post.html?id=${item.id}" class="threenews__oii" style="text-decoration:none; color:inherit; display:block;">
      <div class="threenews__img">
        <img src="../assets/${item.image}" alt="${item.title}">
      </div>
      <div class="threenews__description">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    </a>
  `).join('');
}

// 4. Render Lifestyle
function renderLifestyle() {
  const { big, small } = newsData.lifestyle;

  // Big news — alt text
  document.querySelector('.bignews__img img').src = `../assets/${big.image}`;
  document.querySelector('.bignews__img img').alt = big.title;
  document.querySelector('.bignews__description p').textContent = big.title;

  // Small news — alt text
  const containers = document.querySelectorAll('.smallnews > div');
  small.forEach((item, i) => {
    containers[i].querySelector('.smallnews__img img').src = `../assets/${item.image}`;
    containers[i].querySelector('.smallnews__img img').alt = item.title;
    containers[i].querySelector('.smallnews__description p').textContent = item.title;
  });
}

// 5. Render Topics (Money, Tech, Business, Politics)
function renderTopics() {
  const topicContainers = document.querySelectorAll('.topic');
  const topics = Object.values(newsData.topics);

  topics.forEach((topic, index) => {
    const container = topicContainers[index];
    container.querySelector('h2').textContent = topic.title;

    // SEO: dùng <a href> + alt text, thêm "Show all" trỏ về category
    const newsHTML = topic.news.map(item => `
      <a href="./post.html?id=${item.id}" class="news" style="text-decoration:none; color:inherit; display:block;">
        <div class="news__img">
          <img src="../assets/${item.image}" alt="${item.title}">
        </div>
        <div class="news__description">
          <p>${item.title}</p>
        </div>
      </a>
    `).join('');

    const catParam = encodeURIComponent(topic.title);
    container.innerHTML = `
      <h2>${topic.title}</h2>
      ${newsHTML}
      <div class="block">
        <p><a href="./category.html?type=${catParam}" style="text-decoration:none; color:inherit;">Show all...</a></p>
      </div>`;
  });
}

// 6. Render AI Section
function renderAI() {
  const { main, sideNews } = newsData.ai;

  // Main AI news — alt text
  document.querySelector('.AI_maintopic .AI__img img').src = `../assets/${main.image}`;
  document.querySelector('.AI_maintopic .AI__img img').alt = main.title;
  document.querySelector('.AI_maintopic .AI__description h3').textContent = main.title;
  document.querySelector('.AI_maintopic .AI__description p').textContent = main.description;

  // Side news — alt text
  const newsContainers = document.querySelectorAll('.AI__right > div:not(.block)');
  sideNews.forEach((item, i) => {
    if (newsContainers[i]) {
      newsContainers[i].querySelector('.img__container img').src = `../assets/${item.image}`;
      newsContainers[i].querySelector('.img__container img').alt = item.title;
      newsContainers[i].querySelector('.AI__title p').textContent = item.title;
    }
  });
}

// 7. Render Popular Section
function renderPopular() {
  const { grid1, businessMain, grid3 } = newsData.popular;

  // Grid 1 - Most Popular — alt text
  const grid1Contents = document.querySelectorAll('.grid__box1 > div:not(.grid1__title)');
  grid1.forEach((item, i) => {
    grid1Contents[i].querySelector('img').src = `../assets/${item.image}`;
    grid1Contents[i].querySelector('img').alt = item.title;
    grid1Contents[i].querySelector('h2').textContent = item.category;
    grid1Contents[i].querySelector('p').textContent = item.title;
  });

  // Grid 2 - Business Main — alt text
  document.querySelector('.business__news-img img').src = `../assets/${businessMain.image}`;
  document.querySelector('.business__news-img img').alt = businessMain.title;
  document.querySelector('.business__title').textContent = businessMain.category;
  document.querySelector('.p2').textContent = businessMain.title;
  document.querySelector('.business__news-description p').textContent = businessMain.description;

  // Grid 3 — alt text
  const grid3Containers = [document.querySelector('.lifestyle'), document.querySelector('.politics')];
  grid3.forEach((item, i) => {
    grid3Containers[i].querySelector('img').src = `../assets/${item.image}`;
    grid3Containers[i].querySelector('img').alt = item.title;
    grid3Containers[i].querySelector('h2').textContent = item.category;
    grid3Containers[i].querySelector('p').textContent = item.title;
  });
}

// Setup click handlers cho các phần KHÔNG được chuyển thành <a href> trong render
// (những phần được render thành <a href> rồi thì không cần addEventListener nữa)
function setupClickHandlers() {
  // Featured news — vẫn dùng addEventListener vì HTML tĩnh
  const featuredBox = document.querySelector('.boxupperleft');
  if (featuredBox && newsData.featured.id) {
    featuredBox.style.cursor = 'pointer';
    featuredBox.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.featured.id}`;
    });
  }

  // Lifestyle big — vẫn dùng addEventListener
  const lifestyleBig = document.querySelector('.bignews');
  if (lifestyleBig && newsData.lifestyle.big.id) {
    lifestyleBig.style.cursor = 'pointer';
    lifestyleBig.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.lifestyle.big.id}`;
    });
  }

  // Lifestyle small — vẫn dùng addEventListener
  const lifestyleSmall = document.querySelectorAll('.smallnews > div');
  lifestyleSmall.forEach((item, index) => {
    const newsItem = newsData.lifestyle.small[index];
    if (newsItem && newsItem.id) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // AI main — vẫn dùng addEventListener
  const aiMain = document.querySelector('.AI_maintopic');
  if (aiMain && newsData.ai.main.id) {
    aiMain.style.cursor = 'pointer';
    aiMain.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.ai.main.id}`;
    });
  }

  // AI side news — vẫn dùng addEventListener
  const aiNews = document.querySelectorAll('.AI__right > div:not(.block)');
  aiNews.forEach((item, index) => {
    const newsItem = newsData.ai.sideNews[index];
    if (newsItem && newsItem.id) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Popular grid1 — vẫn dùng addEventListener
  const popularGrid1 = document.querySelectorAll('.grid__box1 > div:not(.grid1__title)');
  popularGrid1.forEach((item, index) => {
    const newsItem = newsData.popular.grid1[index];
    if (newsItem && newsItem.id) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Popular businessMain — vẫn dùng addEventListener
  const businessMain = document.querySelector('.bussiness__news');
  if (businessMain && newsData.popular.businessMain.id) {
    businessMain.style.cursor = 'pointer';
    businessMain.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.popular.businessMain.id}`;
    });
  }

  // Popular grid3 — vẫn dùng addEventListener
  const popularGrid3 = [document.querySelector('.lifestyle'), document.querySelector('.politics')];
  popularGrid3.forEach((item, index) => {
    if (item) {
      const newsItem = newsData.popular.grid3[index];
      if (newsItem && newsItem.id) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          window.location.href = `./post.html?id=${newsItem.id}`;
        });
      }
    }
  });
}

// ===== KHỞI ĐỘNG =====
function initNews() {
  renderFeatured();
  renderLatest();
  renderThreeNews();
  renderLifestyle();
  renderTopics();
  renderAI();
  renderPopular();
  setupClickHandlers();
}

document.addEventListener('DOMContentLoaded', initNews);
window.toggleMenu = toggleMenu;
