// đổi màu khi chọn mục nav
import { newsPort } from "../data/newsPost.js";
export function getType() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('type');
    return param;
}

export const types = [
    'Latest', 'Business News', 'Money and Markets', 'Tech and Innovation', 'A.I.', 'Lifestyle', 'Politics', 'Email', 'Podcast'
]

function toggleNav() {
    const param = getType();
    const navContainer = document.querySelectorAll('.nav__categories a');
    const index = types.findIndex(type => {
        return type === param;
    })
    navContainer[index + 1].classList.add('active');
}
toggleNav();

//load nội dung bài báo
function renderCategory() {
    const newsTitle = document.querySelector('.js-title-container');
    const newsContainer = document.querySelector('.js-news-container');
    const data = newsPort;
    const param = getType();
    // Lọc tin phù hợp
    const filtered = data.filter(news => news.type1 === param || news.type2 === param);

    // Tạo HTML chuỗi duy nhất
    const html = filtered.map(newsShow => `
    <div class="new__box">
        <div class="img">
            <img src="${newsShow.img || ''}" alt="">
        </div>
        <div class="grow">
            <h2>${newsShow.description}</h2>
            <p>By ${newsShow.author || 'Clark Kent'}</p>
            <p>Publish Monday 11:02 PM</p>
        </div>
    </div>
`).join('');

    // Render một lần
    newsTitle.innerHTML = `<div class="title__container js-title-container">
                <h1>${param}</h1>
                <p>In-depth coverage and articles from Aurews about ${param}</p>
            </div>`
    newsContainer.innerHTML = html || '<p>No articles found.</p>';

}

function onClickHandler() {
    const contentBoxes = document.querySelectorAll('.new__box');
    const data = newsPort;
    const param = getType();

    // Lọc lại cùng logic với renderCategory để lấy danh sách hiện tại
    const filtered = data.filter(news => news.type1 === param || news.type2 === param);

    contentBoxes.forEach((box, index) => {
        const newsItem = filtered[index];
        if (newsItem && newsItem.id) {
            box.addEventListener('click', () => {
                window.location.href = `./Post.html?id=${newsItem.id}`;
            });
        }
    });
}
renderCategory();
onClickHandler();
// navContainer.forEach(link => {
//     link.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelectorAll('.nav__categories a').forEach(l => l.classList.remove('active'));
//         this.classList.add('active');
//     });
// });


