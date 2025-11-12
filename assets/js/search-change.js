function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

const sampleNews = [
    {
        id: 1,
        title: "Tech Giants Announce Major AI Breakthrough",
        excerpt: "Leading technology companies reveal new artificial intelligence capabilities that could transform industries.",
        category: "Tech and Innovation",
        date: new Date("2025-11-10"),
        readTime: "5 min",
        image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Tech+News",
        type: "article" // Added type
    },
    {
        id: 2,
        title: "Global Markets React to Economic Policy Changes",
        excerpt: "Stock markets worldwide show volatility following new monetary policy announcements from central banks.",
        category: "Money and Markets",
        date: new Date("2025-11-11"),
        readTime: "4 min",
        image: "https://via.placeholder.com/400x250/50c878/ffffff?text=Markets",
        type: "article"
    },
    {
        id: 3,
        title: "How to Cook Mediterranean Diet",
        excerpt: "A step-by-step video guide to preparing a healthy Mediterranean meal.",
        category: "Lifestyle",
        date: new Date("2025-11-09"),
        readTime: "10 min",
        image: "https://via.placeholder.com/400x250/ff6b6b/ffffff?text=Video",
        type: "video" // Added type
    },
    {
        id: 4,
        title: "Political Leaders Meet for Climate Summit",
        excerpt: "World leaders gather to discuss urgent climate action and renewable energy initiatives.",
        category: "Politics",
        date: new Date("2025-11-08"),
        readTime: "7 min",
        image: "https://via.placeholder.com/400x250/95e1d3/ffffff?text=Politics",
        type: "article"
    },
    {
        id: 5,
        title: "Startup Raises Record Funding for AI Healthcare Solutions",
        excerpt: "Innovative company secures massive investment to develop AI-powered diagnostic tools.",
        category: "Business News",
        date: new Date("2025-11-11"),
        readTime: "5 min",
        image: "https://via.placeholder.com/400x250/f38181/ffffff?text=Business",
        type: "article"
    },
    {
        id: 6,
        title: "Machine Learning Transforms Customer Service Industry",
        excerpt: "Companies adopt advanced AI systems to enhance customer experience and reduce response times.",
        category: "A.I.",
        date: new Date("2025-11-10"),
        readTime: "6 min",
        image: "https://via.placeholder.com/400x250/aa96da/ffffff?text=AI+News",
        type: "article"
    },
    {
        id: 7,
        title: "Listen: The Future of Work",
        excerpt: "A podcast episode exploring remote work trends and digital nomadism.",
        category: "Lifestyle",
        date: new Date("2025-11-07"),
        readTime: "45 min",
        image: "https://via.placeholder.com/400x250/6a89cc/ffffff?text=Podcast",
        type: "podcast" // Added type
    },
    {
        id: 8,
        title: "Beautiful Sunset Photography",
        excerpt: "A stunning collection of photographs from the latest photography contest.",
        category: "Lifestyle",
        date: new Date("2025-11-06"),
        readTime: "2 min",
        image: "https://via.placeholder.com/400x250/ff9f43/ffffff?text=Image+Gallery",
        type: "image" // Added type
    }
];

let allNews = [...sampleNews];
let filteredNews = [...sampleNews];
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || []; // Load from localStorage
let topSuggestions = []; // Will be generated from sampleNews

// Generate top suggestions from sample news
function generateTopSuggestions() {
    const keywordMap = new Map();
    const combinedTexts = sampleNews.map(article =>
        (article.title + ' ' + article.excerpt + ' ' + article.category).toLowerCase()
    );

    combinedTexts.forEach(text => {
        // Simple tokenization: split by non-word characters
        const words = text.split(/\W+/);
        words.forEach(word => {
            if (word.length > 2) { // Only consider words longer than 2 chars
                keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
            }
        });
    });

    // Sort by frequency and get top 10
    topSuggestions = Array.from(keywordMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);
}

function saveRecentSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return;

    // Remove if already exists
    recentSearches = recentSearches.filter(term => term.toLowerCase() !== searchTerm.toLowerCase());
    recentSearches.unshift(searchTerm.trim());

    // Keep only the last 5 searches
    if (recentSearches.length > 5) {
        recentSearches = recentSearches.slice(0, 5);
    }

    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Remove a specific recent search
function removeRecentSearch(term) {
    recentSearches = recentSearches.filter(t => t.toLowerCase() !== term.toLowerCase());
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displaySuggestions(); // Update the dropdown
}

// Clear all recent searches
function clearRecentSearches() {
    recentSearches = [];
    localStorage.removeItem('recentSearches');
    displaySuggestions(); // Update the dropdown
}

// Count active filters
function countActiveFilters() {
    let count = 0;
    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchInFilter = document.getElementById('searchInFilter');

    if (contentTypeFilter && contentTypeFilter.value) count++;
    if (categoryFilter && categoryFilter.value) count++;
    if (dateFilter && dateFilter.value) count++;
    if (searchInFilter && searchInFilter.value !== 'all') count++;
    return count;
}

// Update the filter count badge
function updateFilterCountBadge() {
    const count = countActiveFilters();
    const badge = document.getElementById('activeFiltersCount');
    if (!badge) return;

    if (count > 0) {
        badge.textContent = count;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }
}

// Filter news based on search term, category, date, content type, and search in
function filterNews(searchTerm = '', category = '', dateRange = '', contentType = '', searchIn = 'all') {
    let results = [...allNews];

    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if (searchIn === 'keyword') {
            // Simulate keyword search in title and excerpt
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm)
            );
        } else if (searchIn === 'headline-body') {
            // Simulate search in title and excerpt (body proxy)
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm)
            );
        } else if (searchIn === 'author') {
            // Simulate author search (no author field in sample, so just return all for demo)
            // results = results.filter(article => article.author.toLowerCase().includes(lowerSearchTerm));
        } else { // 'all' or default
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm) ||
                article.category.toLowerCase().includes(lowerSearchTerm)
            );
        }
    }

    if (category) {
        results = results.filter(article => article.category === category);
    }

    if (dateRange) {
        const now = new Date();
        results = results.filter(article => {
            const articleDate = new Date(article.date);
            if (dateRange === 'today') {
                return articleDate.toDateString() === now.toDateString();
            } else if (dateRange === 'week') {
                const oneWeekAgo = new Date(now);
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return articleDate >= oneWeekAgo && articleDate <= now;
            } else if (dateRange === 'month') {
                const oneMonthAgo = new Date(now);
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                return articleDate >= oneMonthAgo && articleDate <= now;
            } else if (dateRange === 'year') {
                const oneYearAgo = new Date(now);
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                return articleDate >= oneYearAgo && articleDate <= now;
            }
            return true;
        });
    }

    if (contentType) {
        results = results.filter(article => article.type === contentType);
    }

    return results;
}

// Sort news based on selected option
function sortNews(news, sortBy) {
    const sortedNews = [...news];
    const now = new Date();

    switch (sortBy) {
        case 'newest':
            sortedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            sortedNews.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular': // Assuming popularity could be based on a future metric, using date as a proxy
            sortedNews.sort((a, b) => {
                // Simple proxy: newer and more recent items are "more popular"
                const aScore = (new Date(a.date).getTime() / 1000) + (a.title.length * 0.1);
                const bScore = (new Date(b.date).getTime() / 1000) + (b.title.length * 0.1);
                return bScore - aScore;
            });
            break;
        case 'relevance': // Default, could be improved with search term context
        default:
            // Keep original order or apply relevance logic if available
            break;
    }
    return sortedNews;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render articles to the grid
function renderArticles(articles) {
    const grid = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid) return;

    grid.innerHTML = ''; // Clear existing articles

    if (articles.length === 0) {
        if (noResults) noResults.style.display = 'block';
        if (resultsCount) resultsCount.innerHTML = '<strong>0</strong> results';
        grid.style.display = 'none';
        return;
    }

    if (noResults) noResults.style.display = 'none';
    grid.style.display = 'grid';
    if (resultsCount) resultsCount.innerHTML = `<strong>${articles.length}</strong> results`;

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.onclick = function () {
            // Replace '#' with actual article URL
            window.location.href = `#article-${article.id}`;
        };

        // Create elements safely to prevent XSS
        const imageDiv = document.createElement('div');
        imageDiv.className = 'article-image';
        // Escape URL to prevent XSS in style attribute
        const escapedImageUrl = escapeHtml(article.image);
        imageDiv.style.backgroundImage = `url('${escapedImageUrl}')`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'article-content';

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'article-category';
        categoryDiv.textContent = article.category;

        const titleH3 = document.createElement('h3');
        titleH3.className = 'article-title';
        titleH3.textContent = article.title;

        const excerptP = document.createElement('p');
        excerptP.className = 'article-excerpt';
        excerptP.textContent = article.excerpt;

        const metaDiv = document.createElement('div');
        metaDiv.className = 'article-meta';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'article-date';
        const dateIcon = document.createElement('i');
        dateIcon.className = 'far fa-calendar';
        dateDiv.appendChild(dateIcon);
        dateDiv.appendChild(document.createTextNode(' ' + article.date.toLocaleDateString()));

        const readTimeDiv = document.createElement('div');
        readTimeDiv.className = 'article-read-time';
        const timeIcon = document.createElement('i');
        timeIcon.className = 'far fa-clock';
        readTimeDiv.appendChild(timeIcon);
        readTimeDiv.appendChild(document.createTextNode(' ' + article.readTime));

        metaDiv.appendChild(dateDiv);
        metaDiv.appendChild(readTimeDiv);

        contentDiv.appendChild(categoryDiv);
        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(excerptP);
        contentDiv.appendChild(metaDiv);

        card.appendChild(imageDiv);
        card.appendChild(contentDiv);

        grid.appendChild(card);
    });
}

// Display search suggestions (Recent + Popular)
function displaySuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const recentList = document.getElementById('recentSuggestionsList');
    const popularList = document.getElementById('popularSuggestionsList');

    if (!suggestionsContainer || !recentList || !popularList) return;

    // Clear lists
    recentList.innerHTML = '';
    popularList.innerHTML = '';

    // Always show the container if there's any suggestion
    if (topSuggestions.length > 0 || recentSearches.length > 0) {
        suggestionsContainer.classList.add('show');
    } else {
        suggestionsContainer.classList.remove('show');
        return;
    }

    // Populate Recent Searches
    recentSearches.forEach(term => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';

        const termEscaped = escapeHtml(term);
        const icon = document.createElement('i');
        icon.className = 'fas fa-search';

        const text = document.createTextNode(' ' + term + ' ');

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-search';
        removeBtn.textContent = '×';
        removeBtn.onclick = function (e) {
            e.stopPropagation();
            removeRecentSearch(term);
        };

        item.appendChild(icon);
        item.appendChild(text);
        item.appendChild(removeBtn);

        item.onclick = function (e) {
            if (!e.target.classList.contains('remove-search')) {
                document.getElementById('searchInput').value = term;
                performSearch();
                hideSuggestions();
            }
        };
        recentList.appendChild(item);
    });

    // Add Clear All Button to Recent Searches list (only if there are items)
    if (recentSearches.length > 0) {
        const clearAllButton = document.createElement('button');
        clearAllButton.className = 'clear-all-btn';
        clearAllButton.textContent = 'Clear all';
        clearAllButton.addEventListener('click', clearRecentSearches);
        recentList.appendChild(clearAllButton);
    }

    // Populate Popular Suggestions
    topSuggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';

        const icon = document.createElement('i');
        icon.className = 'fas fa-search';

        const text = document.createTextNode(' ' + suggestion);

        item.appendChild(icon);
        item.appendChild(text);

        item.onclick = function () {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = suggestion;
                performSearch();
                hideSuggestions();
            }
        };
        popularList.appendChild(item);
    });
}

// Hide search suggestions
function hideSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}

// Show/Hide the clear input button based on input value
function toggleClearButton() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearInputButton');
    if (!input || !clearBtn) return;

    if (input.value.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
}

// Clear the main search input
function clearSearchInput() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.value = '';
    input.focus();
    toggleClearButton();
    hideSuggestions();

    // Clear results when input is cleared
    const articlesGrid = document.getElementById('articlesGrid');
    if (articlesGrid) {
        articlesGrid.innerHTML = '';
    }
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.innerHTML = '<strong>0</strong> results';
    }
}

// Perform search based on input and filters
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const searchInFilter = document.getElementById('searchInFilter');
    const sortDropdown = document.getElementById('sortDropdown');
    const loadingState = document.getElementById('loadingState');
    const articlesGrid = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');

    if (!searchInput || !categoryFilter || !dateFilter || !contentTypeFilter ||
        !searchInFilter || !sortDropdown || !loadingState || !articlesGrid || !noResults) {
        return;
    }

    const searchTerm = searchInput.value;
    const category = categoryFilter.value;
    const dateRange = dateFilter.value;
    const contentType = contentTypeFilter.value;
    const searchIn = searchInFilter.value;
    const sortBy = sortDropdown.value;

    // Show loading state
    loadingState.style.display = 'block';
    articlesGrid.style.display = 'none';
    noResults.style.display = 'none';

    // Simulate API delay with requestAnimationFrame for smoother UX
    setTimeout(() => {
        filteredNews = filterNews(searchTerm, category, dateRange, contentType, searchIn);
        const sortedNews = sortNews(filteredNews, sortBy);
        renderArticles(sortedNews);

        // Hide loading state
        loadingState.style.display = 'none';

        // Save search term if it's not empty
        if (searchTerm.trim() !== '') {
            saveRecentSearch(searchTerm);
            displaySuggestions();
        }
    }, 300); // Reduced delay for better UX
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize event listeners when DOM is ready
function initializeEventListeners() {
    // Search button
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', toggleClearButton);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        searchInput.addEventListener('focus', function () {
            if (this.value.trim() === '') {
                displaySuggestions();
            }
        });
    }

    // Clear input button
    const clearInputButton = document.getElementById('clearInputButton');
    if (clearInputButton) {
        clearInputButton.addEventListener('click', clearSearchInput);
    }

    // Filter dropdowns
    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchInFilter = document.getElementById('searchInFilter');
    const sortDropdown = document.getElementById('sortDropdown');

    if (contentTypeFilter) {
        contentTypeFilter.addEventListener('change', performSearch);
        contentTypeFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
        categoryFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', performSearch);
        dateFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (searchInFilter) {
        searchInFilter.addEventListener('change', performSearch);
        searchInFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function () {
            const sortBy = this.value;
            const sortedNews = sortNews(filteredNews, sortBy);
            renderArticles(sortedNews);
        });
    }

    // Clear all filters button
    const clearAllFiltersBtn = document.getElementById('clearAllFiltersBtn');
    if (clearAllFiltersBtn) {
        clearAllFiltersBtn.addEventListener('click', function () {
            if (contentTypeFilter) contentTypeFilter.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (dateFilter) dateFilter.value = '';
            if (searchInFilter) searchInFilter.value = 'all';
            if (sortDropdown) sortDropdown.value = 'relevance';

            filteredNews = [...allNews];
            renderArticles(allNews);
            hideSuggestions();
            toggleClearButton();
            updateFilterCountBadge();

            const filtersDropdown = document.getElementById('filtersDropdown');
            if (filtersDropdown) {
                filtersDropdown.classList.remove('show');
            }
        });
    }

    // Toggle filters dropdown
    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const filtersDropdown = document.getElementById('filtersDropdown');

    if (toggleFiltersBtn && filtersDropdown) {
        toggleFiltersBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filtersDropdown.classList.toggle('show');
        });
    }

    // Hide suggestions when clicking outside
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const searchInputWrapper = document.querySelector('.search-input-wrapper');
    document.addEventListener('click', function (event) {
        // Hide suggestions
        if (searchInput && suggestionsContainer && searchInputWrapper &&
            !searchInputWrapper.contains(event.target) &&
            !suggestionsContainer.contains(event.target)) {
            hideSuggestions();
        }

        // Hide filters dropdown
        if (toggleFiltersBtn && filtersDropdown &&
            !toggleFiltersBtn.contains(event.target) &&
            !filtersDropdown.contains(event.target)) {
            filtersDropdown.classList.remove('show');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        generateTopSuggestions();
        initializeEventListeners();
        displaySuggestions();
        toggleClearButton();
        updateFilterCountBadge();
    });
} else {
    // DOM is already ready
    generateTopSuggestions();
    initializeEventListeners();
    displaySuggestions();
    toggleClearButton();
    updateFilterCountBadge();
}