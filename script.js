const screens = document.querySelectorAll('.screen');
const choose_pokemon_btns = document.querySelectorAll('.choose-pokemon-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const startmessage = document.getElementById('startmessage');
const message = document.getElementById('message');
const gameovermessage = document.getElementById('gameovermessage');
const winmessage = document.getElementById('winmessage');
let seconds = 0;
let score = 0;
let selected_pokemon = {};
let timer;
let gameRunning = false;

// Mostrar el mensaje inicial al inicio del juego
startmessage.classList.add('visible');

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
});

choose_pokemon_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_pokemon = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createPokemon, 1000);
        startGame();
    });
});

function startGame() {
    seconds = 0;
    score = 0;
    gameRunning = true;
    clearInterval(timer);
    timer = setInterval(() => {
        increaseTime();
        checkGameStatus();
    }, 1000);
}

function increaseTime() {
    if (gameRunning) {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;
        timeEl.innerHTML = `Time: ${m}:${s}`;
        seconds++;
    }
}

function createPokemon() {
    if (gameRunning) {
        const pokemon = document.createElement('div');
        pokemon.classList.add('pokemon');
        const { x, y } = getRandomLocation();
        pokemon.style.top = `${y}px`;
        pokemon.style.left = `${x}px`;
        pokemon.innerHTML = `<img src="${selected_pokemon.src}" alt="${selected_pokemon.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

        pokemon.addEventListener('click', catchPokemon);

        game_container.appendChild(pokemon);
    }
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchPokemon() {
    if (gameRunning && !this.classList.contains('caught')) {
        increaseScore();
        this.classList.add('caught');
        setTimeout(() => this.remove(), 2000);
        addPokemons();
    }
}

function addPokemons() {
    if (gameRunning) {
        setTimeout(createPokemon, 1000);
        setTimeout(createPokemon, 1500);
    }
}

function increaseScore() {
    if (gameRunning) {
        score++;
        if (score == 3) {
            startmessage.classList.remove('visible');
        }
        if (score >= 10) {
            message.classList.add('visible');
        }
        if (score > 12) {
            message.classList.remove('visible');
        }
        if (score >= 30) {
            gameRunning = false;
            clearInterval(timer);
            showWinMessage();
        }
        scoreEl.innerHTML = `Score: ${score}`;
    }
}

function checkGameStatus() {
    if (gameRunning && seconds >= 40 && score < 30) {
        gameRunning = false;
        clearInterval(timer);
        showGameOverMessage();
    }
}

function showGameOverMessage() {
    gameovermessage.classList.add('visible');
    setTimeout(() => {
        resetGame();
    }, 3000);
}

function showWinMessage() {
    winmessage.classList.add('visible');
    setTimeout(() => {
        resetGame();
    }, 4000);
}

function resetGame() {
    screens.forEach(screen => screen.classList.remove('up'));
    startmessage.classList.add('visible');
    gameovermessage.classList.remove('visible');
    winmessage.classList.remove('visible');
    score = 0;
    seconds = 0;
    scoreEl.innerHTML = `Score: ${score}`;
    timeEl.innerHTML = `Time: 00:00`;
    gameRunning = false;
    const pokemons = document.querySelectorAll('.pokemon');
  pokemons.forEach(pokemon => pokemon.remove());

}
