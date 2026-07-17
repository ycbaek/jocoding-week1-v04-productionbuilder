const MENUS = [
    { name: '김치찌개',     emoji: '🍲', category: '한식' },
    { name: '된장찌개',     emoji: '🥘', category: '한식' },
    { name: '비빔밥',       emoji: '🍚', category: '한식' },
    { name: '삼겹살',       emoji: '🥓', category: '한식' },
    { name: '제육볶음',     emoji: '🐷', category: '한식' },
    { name: '순두부찌개',   emoji: '🌶️', category: '한식' },
    { name: '냉면',         emoji: '🥶', category: '한식' },
    { name: '짜장면',       emoji: '🍜', category: '중식' },
    { name: '짬뽕',         emoji: '🍲', category: '중식' },
    { name: '탕수육',       emoji: '🍖', category: '중식' },
    { name: '마라탕',       emoji: '🥵', category: '중식' },
    { name: '볶음밥',       emoji: '🍳', category: '중식' },
    { name: '초밥',         emoji: '🍣', category: '일식' },
    { name: '라멘',         emoji: '🍜', category: '일식' },
    { name: '돈카츠',       emoji: '🍤', category: '일식' },
    { name: '규동',         emoji: '🍱', category: '일식' },
    { name: '우동',         emoji: '🍲', category: '일식' },
    { name: '파스타',       emoji: '🍝', category: '양식' },
    { name: '피자',         emoji: '🍕', category: '양식' },
    { name: '햄버거',       emoji: '🍔', category: '양식' },
    { name: '스테이크',     emoji: '🥩', category: '양식' },
    { name: '샐러드',       emoji: '🥗', category: '양식' },
    { name: '떡볶이',       emoji: '🌶️', category: '분식' },
    { name: '김밥',         emoji: '🍙', category: '분식' },
    { name: '라면',         emoji: '🍜', category: '분식' },
    { name: '순대',         emoji: '🍢', category: '분식' },
    { name: '쌀국수',       emoji: '🍲', category: '아시안' },
    { name: '팟타이',       emoji: '🍤', category: '아시안' },
    { name: '카레',         emoji: '🍛', category: '아시안' },
    { name: '분짜',         emoji: '🥢', category: '아시안' },
];

const CATEGORIES = ['전체', '한식', '중식', '일식', '양식', '분식', '아시안'];

const history = [];
let selectedCategory = '전체';
let isPicking = false;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function getCategoryClass(category) {
    switch (category) {
        case '한식':   return 'cat-korean';
        case '중식':   return 'cat-chinese';
        case '일식':   return 'cat-japanese';
        case '양식':   return 'cat-western';
        case '분식':   return 'cat-snack';
        default:       return 'cat-asian';
    }
}

function getCandidates() {
    if (selectedCategory === '전체') return MENUS;
    return MENUS.filter(menu => menu.category === selectedCategory);
}

function renderCategories() {
    document.getElementById('categories').innerHTML = CATEGORIES.map(cat =>
        `<button class="chip ${cat === selectedCategory ? 'active' : ''}"
                 onclick="selectCategory('${cat}')">${cat}</button>`
    ).join('');
}

function selectCategory(category) {
    if (isPicking) return;
    selectedCategory = category;
    renderCategories();
}

function renderMenu(menu, extraClass = '') {
    const cardEl = document.getElementById('menuCard');
    cardEl.className = `menu-card ${getCategoryClass(menu.category)} ${extraClass}`;
    cardEl.innerHTML = `
        <div class="menu-emoji">${menu.emoji}</div>
        <div class="menu-name">${menu.name}</div>
        <div class="menu-category">${menu.category}</div>
    `;
}

async function recommend() {
    if (isPicking) return;
    isPicking = true;

    const btn = document.getElementById('recommendBtn');
    btn.disabled = true;
    btn.classList.add('disabled');
    btn.textContent = '고르는 중...';

    const candidates = getCandidates();
    const picked = candidates[Math.floor(Math.random() * candidates.length)];

    // Spin through random candidates before locking in the pick.
    const rollDuration = 1200;
    const rollInterval = 80;
    const steps = rollDuration / rollInterval;

    for (let s = 0; s < steps; s++) {
        const temp = candidates[Math.floor(Math.random() * candidates.length)];
        renderMenu(temp, 'rolling');
        await delay(rollInterval);
    }

    renderMenu(picked, 'reveal');

    history.unshift(picked);
    if (history.length > 6) history.pop();
    renderHistory();

    btn.disabled = false;
    btn.classList.remove('disabled');
    btn.textContent = '메뉴 추천';
    isPicking = false;
}

function renderHistory() {
    if (history.length <= 1) {
        document.getElementById('historySection').style.display = 'none';
        return;
    }
    document.getElementById('historySection').style.display = 'block';
    document.getElementById('history').innerHTML = history.slice(1).map(menu =>
        `<div class="history-item ${getCategoryClass(menu.category)}">
            <span>${menu.emoji}</span>
            <span>${menu.name}</span>
        </div>`
    ).join('');
}

// Submit the request form to Formspree via fetch so the page never navigates away.
async function submitRequest(event) {
    event.preventDefault();

    const form = event.target;
    const btn = document.getElementById('requestBtn');
    const status = document.getElementById('formStatus');

    btn.disabled = true;
    btn.classList.add('disabled');
    btn.textContent = '보내는 중...';
    status.textContent = '';
    status.className = 'form-status';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) throw new Error('Formspree returned ' + response.status);

        form.reset();
        status.textContent = '요청이 전송되었습니다. 감사합니다!';
        status.classList.add('success');
    } catch (err) {
        status.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        status.classList.add('error');
    }

    btn.disabled = false;
    btn.classList.remove('disabled');
    btn.textContent = '요청 보내기';
}

document.getElementById('requestForm').addEventListener('submit', submitRequest);

renderCategories();
recommend();
