const lottoHistory = [];
let isDrawing = false;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function getColorClass(num) {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-10';
    if (num <= 30) return 'range-20';
    if (num <= 40) return 'range-30';
    return 'range-40';
}

async function generate() {
    if (isDrawing) return;
    isDrawing = true;

    const btn = document.getElementById('generateBtn');
    if (btn) {
        btn.disabled = true;
        btn.classList.add('disabled');
        btn.textContent = '번호 추첨 중...';
    }

    const numbers = [];
    while (numbers.length < 6) {
        const n = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(n)) numbers.push(n);
    }
    numbers.sort((a, b) => a - b);

    const ballsEl = document.getElementById('balls');
    
    // Render 6 placeholders first
    ballsEl.innerHTML = Array(6).fill(0).map(() => 
        `<div class="ball placeholder">?</div>`
    ).join('');

    const ballElements = ballsEl.querySelectorAll('.ball');

    for (let i = 0; i < 6; i++) {
        const finalVal = numbers[i];
        const ballEl = ballElements[i];
        
        // Let's make it roll
        const rollDuration = 500; // 0.5s roll
        const rollInterval = 50;
        const steps = rollDuration / rollInterval;
        
        ballEl.classList.remove('placeholder');
        ballEl.classList.add('rolling');
        
        for (let s = 0; s < steps; s++) {
            const tempVal = Math.floor(Math.random() * 45) + 1;
            ballEl.textContent = tempVal;
            await delay(rollInterval);
        }
        
        ballEl.classList.remove('rolling');
        ballEl.textContent = finalVal;
        ballEl.classList.add(getColorClass(finalVal));
        ballEl.classList.add('reveal');
        
        // Wait 300ms before starting the next ball
        await delay(300);
    }

    lottoHistory.unshift(numbers);
    if (lottoHistory.length > 6) lottoHistory.pop();
    renderHistory();

    if (btn) {
        btn.disabled = false;
        btn.classList.remove('disabled');
        btn.textContent = '번호 생성';
    }
    isDrawing = false;
}

function renderHistory() {
    if (lottoHistory.length <= 1) {
        document.getElementById('historySection').style.display = 'none';
        return;
    }
    document.getElementById('historySection').style.display = 'block';
    document.getElementById('history').innerHTML = lottoHistory.slice(1).map(nums =>
        `<div class="history-item">${nums.map(n =>
            `<div class="history-ball ${getColorClass(n)}">${n}</div>`
        ).join('')}</div>`
    ).join('');
}

generate();

