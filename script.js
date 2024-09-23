// Pseudorandom Number Generators
function jsRandom() {
    return Math.random();
}

function xorshift(seed) {
    let x = seed || Date.now();
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return (x >>> 0) / (1 << 31);
}

// Mersenne Twister Implementation
class MersenneTwister {
    constructor(seed) {
        this.MT = Array(624).fill(0);
        this.index = 0;
        this.MT[0] = seed;
        for (let i = 1; i < 624; i++) {
            this.MT[i] = (1812433253 * (this.MT[i - 1] ^ (this.MT[i - 1] >>> 30)) + i) >>> 0;
        }
    }

    _generate() {
        let y;
        const UPPER_MASK = 0x80000000;
        const LOWER_MASK = 0x7fffffff;
        const MATRIX_A = 0x9908b0df;
        const TEMPERING_MASK_B = 0x9d2c5680;
        const TEMPERING_MASK_C = 0xefc60000;

        if (this.index === 624) {
            let i;
            for (i = 0; i < 624; i++) {
                y = (this.MT[i] & UPPER_MASK) | (this.MT[(i + 1) % 624] & LOWER_MASK);
                this.MT[i] = this.MT[(i + 397) % 624] ^ (y >>> 1);
                if (y % 2 !== 0) {
                    this.MT[i] ^= MATRIX_A;
                }
            }
            this.index = 0;
        }

        y = this.MT[this.index++];
        y ^= (y >>> 11);
        y ^= (y << 7) & TEMPERING_MASK_B;
        y ^= (y << 15) & TEMPERING_MASK_C;
        y ^= (y >>> 18);
        return y >>> 0;
    }

    random() {
        return this._generate() / 0xFFFFFFFF;
    }
}

// PCG Implementation
class PCG {
    constructor(seed) {
        this.state = seed;
        this.inc = 0x23553f;
    }

    _next() {
        let oldState = this.state;
        this.state = oldState * 6364136223846793005n + (this.inc | 0);
        let xorshifted = (((oldState >>> 18n) ^ oldState) >>> 27n) >>> 0;
        let rot = oldState >>> 59n;
        return ((xorshifted >>> rot) | (xorshifted << ((-rot) & 31))) >>> 0;
    }

    random() {
        return this._next() / 0xFFFFFFFF;
    }
}

// WELL512a.c Implementation (Placeholder)
class WELL512a {
    constructor(seed) {
        this.state = Array(16).fill(0);
        this.state[0] = seed;
        this.index = 0;
        for (let i = 1; i < 16; i++) {
            this.state[i] = (1812433253 * (this.state[i - 1] ^ (this.state[i - 1] >>> 30)) + i) >>> 0;
        }
    }

    _generate() {
        const state = this.state;
        const index = this.index;
        const MATRIX_A = 0xB5026F5AA96619E9;
        const UPPER_MASK = 0x80000000;
        const LOWER_MASK = 0x7fffffff;

        const y = state[index];
        state[index] = state[(index + 15) & 15] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
        this.index = (index + 1) & 15;
        return state[this.index] / 0xFFFFFFFF;
    }

    random() {
        return this._generate();
    }
}

// Random Number Generator Functions
function mersenneTwister(seed) {
    const mt = new MersenneTwister(seed);
    return mt.random();
}

function pcg(seed) {
    const pcg = new PCG(seed);
    return pcg.random();
}

function well512(seed) {
    const well = new WELL512a(seed);
    return well.random();
}

// Shuffle Visualization
function displayShuffle(seed) {
    console.log('Displaying shuffle with seed:', seed);
    const deckSize = parseInt(document.getElementById('deckSize').value) || 52;
    const shuffleType = document.getElementById('shuffleType').value;
    let deck = Array.from({length: deckSize}, (_, i) => i + 1);
    deck = shuffle(deck, seed, shuffleType);
    
    const deckContainer = document.getElementById('deckContainer');
    deckContainer.innerHTML = '';
    deck.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.textContent = card;
        deckContainer.appendChild(cardDiv);
    });
}

function shuffle(deck, seed, shuffleType) {
    console.log('Shuffling deck of size', deck.length, 'with seed', seed);
    // Implementing Fisher-Yates shuffle for simplicity
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(xorshift(seed) * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Performance Testing
function runTest(rngFunction, rounds) {
    const startTime = performance.now();
    for (let i = 0; i < rounds; i++) {
        rngFunction();
    }
    const endTime = performance.now();
    return {
        start: startTime,
        end: endTime,
        total: (endTime - startTime).toFixed(2)
    };
}

function displayResults(algorithm, result) {
    console.log('Displaying results for', algorithm);
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${algorithm}</td>
        <td>${result.start.toFixed(2)} ms</td>
        <td>${result.end.toFixed(2)} ms</td>
        <td>${result.total} ms</td>
    `;
    tbody.appendChild(row);
}

// Chart.js Integration
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Execution Time (ms)',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updatePerformanceChart(algorithm, time) {
    console.log('Updating chart with', algorithm, time, 'ms');
    performanceChart.data.labels.push(algorithm);
    performanceChart.data.datasets[0].data.push(time);
    performanceChart.update();
}

// Event Listeners
document.getElementById("jsRandomBtn").addEventListener("click", () => {
    const rounds = parseInt(document.getElementById("roundsInput").value);
    const seed = parseInt(document.getElementById("seedInput").value) || Math.random() * 100000;

    if (rounds >= 1 && rounds <= 10000) {
        const result = runTest(jsRandom, rounds);
        displayResults("JS Random", result);
        updatePerformanceChart("JS Random", result.total);
        if (document.getElementById('shuffleVisualization').checked) displayShuffle(seed);
    } else {
        alert("Please enter a valid number of rounds between 1 and 10,000.");
    }
});

document.getElementById("xorshiftBtn").addEventListener("click", () => {
    const rounds = parseInt(document.getElementById("roundsInput").value);
    const seed = parseInt(document.getElementById("seedInput").value) || Math.random() * 100000;

    if (rounds >= 1 && rounds <= 10000) {
        const result = runTest(() => xorshift(seed), rounds);
        displayResults("Xorshift", result);
        updatePerformanceChart("Xorshift", result.total);
        if (document.getElementById('shuffleVisualization').checked) displayShuffle(seed);
    } else {
        alert("Please enter a valid number of rounds between 1 and 10,000.");
    }
});

document.getElementById("wellBtn").addEventListener("click", () => {
    const rounds = parseInt(document.getElementById("roundsInput").value);
    const seed = parseInt(document.getElementById("seedInput").value) || Math.random() * 100000;

    if (rounds >= 1 && rounds <= 10000) {
        const result = runTest(() => well512(seed), rounds);
        displayResults("WELL512a.c", result);
        updatePerformanceChart("WELL512a.c", result.total);
        if (document.getElementById('shuffleVisualization').checked) displayShuffle(seed);
    } else {
        alert("Please enter a valid number of rounds between 1 and 10,000.");
    }
});

document.getElementById("mersenneBtn").addEventListener("click", () => {
    const rounds = parseInt(document.getElementById("roundsInput").value);
    const seed = parseInt(document.getElementById("seedInput").value) || Math.random() * 100000;

    if (rounds >= 1 && rounds <= 10000) {
        const result = runTest(() => mersenneTwister(seed), rounds);
        displayResults("Mersenne Twister", result);
        updatePerformanceChart("Mersenne Twister", result.total);
        if (document.getElementById('shuffleVisualization').checked) displayShuffle(seed);
    } else {
        alert("Please enter a valid number of rounds between 1 and 10,000.");
    }
});

document.getElementById("pcgBtn").addEventListener("click", () => {
    const rounds = parseInt(document.getElementById("roundsInput").value);
    const seed = parseInt(document.getElementById("seedInput").value) || Math.random() * 100000;

    if (rounds >= 1 && rounds <= 10000) {
        const result = runTest(() => pcg(seed), rounds);
        displayResults("PCG", result);
        updatePerformanceChart("PCG", result.total);
        if (document.getElementById('shuffleVisualization').checked) displayShuffle(seed);
    } else {
        alert("Please enter a valid number of rounds between 1 and 10,000.");
    }
});

// Seed Exploration Mode
document.getElementById("seedInput").addEventListener("input", (event) => {
    const seed = parseInt(event.target.value);
    if (!isNaN(seed)) {
        displayShuffle(seed);
    }
});

// Dark Mode Toggle
const darkModeCheckbox = document.getElementById('darkModeCheckbox');
darkModeCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});