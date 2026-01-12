const BLOG_POSTS = [
    {
        id: 1,
        title: "Mastering CSS Grid: A Comprehensive Guide",
        excerpt: "CSS Grid has revolutionized web layout. In this deep dive, we explore advanced techniques, subgrid, and how to build complex responsive interfaces.",
        date: "Dec 24, 2025",
        category: "Web Dev",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        featured: true
    },
    {
        id: 2,
        title: "React Server Components: The Good, The Bad",
        excerpt: "An honest look at the current state of RSCs and when you should actually use them in your production applications.",
        date: "Dec 22, 2025",
        category: "React",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    },
    {
        id: 3,
        title: "Dockerizing a Node.js App: Best Practices",
        excerpt: "Learn how to create efficient, secure, and production-ready Docker images for your Node.js microservices.",
        date: "Dec 20, 2025",
        category: "DevOps",
        image: "https://images.unsplash.com/photo-1607799275518-d58665d099db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    },
    {
        id: 4,
        title: "Python 3.14: What's New?",
        excerpt: "Exploring the latest features, performance improvements, and syntax changes in the upcoming Python release.",
        date: "Dec 18, 2025",
        category: "Python",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    }
];

const CATEGORIES = [
    { name: "Web Dev", count: 12 },
    { name: "JavaScript", count: 8 },
    { name: "Python", count: 5 },
    { name: "DevOps", count: 3 }
];

// --- Persistence: Load Theme ---
const savedTheme = localStorage.getItem('pk_theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Bind Theme Toggle with Persistence
const toggleBtn = document.querySelector('.theme-toggle');
if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('pk_theme', newTheme);
    });
}

// Bind Mobile Menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        document.querySelector('.main-nav').classList.toggle('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    renderCategories();
    fetchBuddy(); // The "Reality" part

    // Bind Refresh Button
    const refreshBtn = document.getElementById('refresh-buddy');
    if(refreshBtn) {
        refreshBtn.addEventListener('click', fetchBuddy);
    }

    // --- Search Logic ---
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = BLOG_POSTS.filter(post => 
                post.title.toLowerCase().includes(query) || 
                post.category.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query)
            );
            renderPosts(filtered);
        });
    }

    // --- Init Battle Game ---
    initBattleGame();
});

// --- Read History Persistence ---
function getReadHistory() {
    const history = localStorage.getItem('pk_read_history');
    return history ? JSON.parse(history) : [];
}

function markPostAsRead(id) {
    const history = getReadHistory();
    if (!history.includes(id)) {
        history.push(id);
        localStorage.setItem('pk_read_history', JSON.stringify(history));
    }
}

// --- Dynamic Rendering ---
function renderPosts(posts = BLOG_POSTS) {
    const featuredContainer = document.getElementById('featured-post-container');
    const postsContainer = document.getElementById('posts-container');
    const readHistory = getReadHistory();
    
    // Only clear if elements exist (might be absent on article.html)
    if (featuredContainer) featuredContainer.innerHTML = '';
    if (postsContainer) postsContainer.innerHTML = '';

    // If no results
    if (posts.length === 0 && postsContainer) {
        postsContainer.innerHTML = '<div style="padding: 20px; font-family: var(--font-heading);">데이터를 찾을 수 없습니다... (No Data)</div>';
        return;
    }

    posts.forEach(post => {
        const isRead = readHistory.includes(post.id);
        const caughtIcon = isRead ? '<span title="Caught (Read)" style="margin-left:5px; font-size: 1rem;">🔴</span>' : ''; // Red ball for caught

        if (post.featured && featuredContainer) {
            // Render Featured
            const html = `
                <div class="post-card featured">
                    <div class="post-image">
                        <img src="${post.image}" alt="${post.title}">
                        <span class="category-tag">${post.category}</span>
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span class="date">${post.date}</span>
                            <span class="read-time">기록 No.${post.id}</span>
                        </div>
                        <h2 class="post-title"><a href="article.html?id=${post.id}">${post.title} ${caughtIcon}</a></h2>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <a href="article.html?id=${post.id}" class="read-more">데이터 읽기 <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            featuredContainer.innerHTML = html;
        } else if (postsContainer) {
            // Render Recent List
            const html = `
                <article class="post-card horizontal">
                    <div class="post-image">
                        <a href="article.html?id=${post.id}">
                            <img src="${post.image}" alt="${post.title}">
                        </a>
                    </div>
                    <div class="post-content">
                        <span class="category-tag">${post.category}</span>
                        <h3 class="post-title"><a href="article.html?id=${post.id}">${post.title} ${caughtIcon}</a></h3>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-meta">
                            <span class="date">${post.date}</span>
                        </div>
                    </div>
                </article>
            `;
            postsContainer.innerHTML += html;
        }
    });
}
// ... (Keep existing renderCategories, loadArticle, fetchBuddy)

// --- Wild Bug Battle Logic ---
const BUG_QUESTIONS = [
    { q: "JS에서 데이터 타입이 아닌 것은?", options: ["Symbol", "Float", "Boolean", "BigInt"], a: "Float" },
    { q: "CSS: div를 중앙 정렬하는 방법은?", options: ["float: center", "align: middle", "flexbox", "position: nice"], a: "flexbox" },
    { q: "DOM의 약자는 무엇인가?", options: ["Data Object Mode", "Doc Object Model", "Doc Orient Mode", "Donut"], a: "Doc Object Model" },
    { q: "React: 사이드 이펙트를 다루는 훅은?", options: ["useState", "useEffect", "useMagic", "useSide"], a: "useEffect" }
];

function initBattleGame() {
    const battleOptions = document.getElementById('battle-options');
    if (!battleOptions) return; // Not present on page

    startNewBattle();
}

function startNewBattle() {
    const battleText = document.getElementById('battle-text');
    const battleOptions = document.getElementById('battle-options');
    const hpFill = document.querySelector('.hp-fill');
    
    // Reset HP
    if(hpFill) hpFill.style.width = '100%';

    // Pick Question
    const q = BUG_QUESTIONS[Math.floor(Math.random() * BUG_QUESTIONS.length)];
    
    battleText.textContent = `버그 발생: ${q.q}`;
    battleOptions.innerHTML = ''; // Clear old buttons

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'battle-option';
        btn.textContent = opt;
        btn.onclick = () => handleAttack(opt, q.a);
        battleOptions.appendChild(btn);
    });
}

function handleAttack(selected, correct) {
    const battleText = document.getElementById('battle-text');
    const hpFill = document.querySelector('.hp-fill');
    const battleOptions = document.getElementById('battle-options');

    if (selected === correct) {
        // Critical Hit!
        if(hpFill) hpFill.style.width = '0%';
        battleText.textContent = "효과는 굉장했다! 버그가 쓰러졌다!";
        battleOptions.innerHTML = '<button class="battle-option" onclick="startNewBattle()">다음 버그</button>';
        
        // Confetti effect (simulated)
        // alert("🎉 Caught the Bug!"); 
    } else {
        // Miss!
        battleText.textContent = "공격이 빗나갔다! 버그가 반격합니다!";
        // Shake effect?
        const scene = document.querySelector('.battle-scene');
        scene.style.transform = "translateX(5px)";
        setTimeout(() => scene.style.transform = "none", 100);
    }
}


function renderCategories() {
    const list = document.getElementById('categories-list');
    if(!list) return;
    
    list.innerHTML = CATEGORIES.map(cat => `
        <li><a href="#">${cat.name} <span class="count">${cat.count}</span></a></li>
    `).join('');
}

// --- Article Detail Logic ---
function loadArticle() {
    const articleContainer = document.getElementById('article-view');
    if(!articleContainer) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    const post = BLOG_POSTS.find(p => p.id === id);

    if (post) {
        document.title = `PokeLog - ${post.title}`; // Update Page Title
        articleContainer.innerHTML = `
            <div class="post-card featured" style="border: none; box-shadow: none; background: transparent;">
                <div class="post-image" style="border: 3px solid var(--pk-black); border-radius: 8px; margin-bottom: 2rem;">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="category-tag">${post.category}</span>
                </div>
                <div class="post-content" style="padding: 0;">
                    <div class="post-meta" style="font-size: 0.8rem; margin-bottom: 1rem;">
                        <span class="date">${post.date}</span> |
                        <span class="read-time">Entry #${post.id}</span>
                    </div>
                    <h1 class="post-title" style="font-size: 2rem; margin-bottom: 1.5rem;">${post.title}</h1>
                    
                    <div class="entry-content" style="font-size: 1.1rem; line-height: 1.8;">
                        <p><strong>[SYSTEM LOG]: Accessing Data Entry #${post.id}...</strong></p>
                        <br>
                        <p>${post.excerpt}</p>
                        <br>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <br>
                        <h3>Key Takeaways</h3>
                        <ul>
                            <li>Understanding the core concepts of ${post.category}.</li>
                            <li>Best practices for implementation.</li>
                            <li>Common pitfalls to avoid in production.</li>
                        </ul>
                        <br>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        
                        <div style="margin-top: 2rem; padding: 1rem; background: #eee; border-left: 5px solid var(--pk-blue);">
                            <strong>Trainer Tip:</strong> Always verify your data before deploying to production!
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        articleContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2 style="font-family: var(--font-heading);">MissingNo. Found</h2>
                <p>The data entry you are looking for does not exist.</p>
            </div>
        `;
    }
}

// --- "Reality" / PokeAPI Logic ---
async function fetchBuddy() {
    const buddyContainer = document.getElementById('buddy-container');
    const nameEl = document.getElementById('buddy-name');
    
    if (!buddyContainer) return;

    // Show Loading
    buddyContainer.innerHTML = '<div class="loading-text">스캔 중...</div>';

    try {
        const id = Math.floor(Math.random() * 151) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        
        // Fetch Species for Korean Name
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const koreanNameEntry = speciesData.names.find(n => n.language.name === 'ko');
        const name = koreanNameEntry ? koreanNameEntry.name : data.name.toUpperCase();
        
        const imgUrl = data.sprites.front_default;

        buddyContainer.innerHTML = `<img src="${imgUrl}" alt="${name}" style="image-rendering: pixelated; width: 100px;">`;
        if(nameEl) nameEl.textContent = name;
        
    } catch (e) {
        console.error("Wild Coding Buddy fled!", e);
        buddyContainer.innerHTML = '<div style="font-size:0.8rem;">도망갔다!</div>';
        if(nameEl) nameEl.textContent = "MissingNo.";
    }
}


// --- Theme Toggle (Pokeball) ---
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation effect on toggle is handled by CSS rotation
    });
}
