const stockData = [
    { symbol: 'COF', percent: -2.61, price: 211.15, change: -5.65 },
    { symbol: 'COIN', percent: 0.30, price: 284.00, change: 0.86 },
    { symbol: 'RDFN', percent: 0.00, price: 11.19, change: 0.00 },
    { symbol: 'CMCSA', percent: -1.64, price: 27.51, change: -0.46 },
    { symbol: 'NWS', percent: -0.40, price: 29.56, change: -0.12 },
    { symbol: 'DOOO', percent: -0.02, price: 64.11, change: -0.01 },
    { symbol: 'HOG', percent: -0.40, price: 24.71, change: -0.10 }
];

function generateMiniChart(trend) {
    const points = 20;
    let path = 'M 0 12';
    let trendFactor = 0;
    if (trend > 0) trendFactor = -1;
    if (trend < 0) trendFactor = 1;

    for (let i = 1; i < points; i++) {
        const x = (i / (points - 1)) * 60;
        const variance = (Math.random() - 0.5) * 8;
        const trendValue = trendFactor * i * 0.3;
        const y = 12 + trendValue + variance;
        path += ` L ${x} ${Math.max(2, Math.min(22, y))}`;
    }

    return path;
}

function getStatusClass(value) {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
}

function formatNumber(num) {
    return num >= 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
}

// --- HÀM MỚI ĐỂ CẬP NHẬT GIÁ TRỊ ---
function updateTickerValues() {
    // 1. Cập nhật dữ liệu trong mảng stockData
    stockData.forEach(stock => {
        const change = (Math.random() - 0.5) * (stock.price / 100); // thay đổi nhỏ dựa trên giá
        const oldPrice = stock.price;
        stock.price += change;
        stock.change = stock.price - (oldPrice - stock.change); // Tính lại mức thay đổi trong ngày
        stock.percent = (stock.change / (oldPrice)) * 100;
    });

    // 2. Tìm và cập nhật các phần tử HTML đã có
    stockData.forEach(stock => {
        const statusClass = getStatusClass(stock.percent);
        const chartPath = generateMiniChart(stock.percent);

        // Tìm tất cả các item có cùng mã chứng khoán (sẽ có 2 item do nhân đôi)
        const itemsToUpdate = document.querySelectorAll(`.stock-item[data-symbol="${stock.symbol}"]`);

        itemsToUpdate.forEach(item => {
            const chart = item.querySelector('.mini-chart');
            const chartPathEl = chart.querySelector('path');
            const percentEl = item.querySelector('.stock-change');
            const priceEl = item.querySelector('.stock-price');
            const changeEl = item.querySelector('.price-change');

            // Cập nhật class màu sắc
            chart.className = `mini-chart ${statusClass}`;
            percentEl.className = `stock-change ${statusClass}`;
            changeEl.className = `price-change ${statusClass}`;

            // Cập nhật nội dung
            chartPathEl.setAttribute('d', chartPath);
            percentEl.textContent = `${formatNumber(stock.percent)}%`;
            priceEl.textContent = stock.price.toFixed(2);
            changeEl.textContent = formatNumber(stock.change);
        });
    });
}

// --- HÀM RENDER BAN ĐẦU (CHỈ CHẠY 1 LẦN) ---
function initialRenderTicker() {
    const wrapper = document.getElementById('tickerWrapper');
    wrapper.innerHTML = ''; // Xóa nội dung cũ (nếu có)

    // Render 2 lần để tạo hiệu ứng cuộn vòng lặp
    for (let repeat = 0; repeat < 2; repeat++) {
        stockData.forEach(stock => {
            const statusClass = getStatusClass(stock.percent);
            const chartPath = generateMiniChart(stock.percent);

            const stockItem = document.createElement('div');
            // Thêm data-symbol để định danh
            stockItem.className = 'stock-item';
            stockItem.setAttribute('data-symbol', stock.symbol);

            stockItem.innerHTML = `
                        <svg class="mini-chart ${statusClass}" viewBox="0 0 60 24">
                            <path d="${chartPath}"/>
                        </svg>
                        <span class="stock-symbol">${stock.symbol}</span>
                        <span class="stock-change ${statusClass}">${formatNumber(stock.percent)}%</span>
                        <span class="stock-price">${stock.price.toFixed(2)}</span>
                        <span class="price-change ${statusClass}">${formatNumber(stock.change)}</span>
                    `;

            wrapper.appendChild(stockItem);
        });
    }
}

// --- KHỞI CHẠY ---
initialRenderTicker(); // Chạy hàm render ban đầu 1 lần

// Cập nhật giá trị mỗi 5 giây mà không vẽ lại toàn bộ banner
setInterval(updateTickerValues, 5000);