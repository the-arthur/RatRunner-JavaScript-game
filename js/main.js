

console.log('Hello, welcome to RatJump game! \n Made by https://github.com/the-arthur \n Hope you enjoy it :)')

const hero = document.querySelector(".hero");
const trap = document.querySelector(".trap");
const screen = document.querySelector(".screen");
const scoreWrapper = document.querySelector(".score-wrapper");
const trapDeleteTarget = Math.abs(parseInt(window.getComputedStyle(trap).getPropertyValue('right'))) * 6 - 100;
const trapLoseTarget = (Math.abs(parseInt(window.getComputedStyle(trap).getPropertyValue('right'))) * 4.5) - (Math.abs(parseInt(window.getComputedStyle(hero).getPropertyValue('width'))) * 1.5);
const heroLoseTarget = Math.abs(parseInt(window.getComputedStyle(hero).getPropertyValue('top')));
const scoreResult = document.querySelector(".score-result");
const PlayAgainBtn = document.querySelector(".play-again-btn");
let score = 0;
const jumpAudio = new Audio('./sound/jump.mp3');
const gameOverAudio = new Audio('./sound/gameOver.mp3');



let jump = () => {
    if (!hero.classList.contains("hero-jump")) {
        hero.classList.add("hero_jump");
        jumpAudio.volume = 0.3;
        jumpAudio.play();
        // console.log(new Date().toLocaleString() + ' Jump!')
        setTimeout(() => {
            hero.classList.remove("hero_jump");
        }, 500);
    }
}

let trapSpawn = () => {
    let randomValue = Math.round(Math.random() * (3000 - 700) + 700);
    setTimeout(() => {
        screen.appendChild(trap.cloneNode(true));
        trapSpawn();
        // console.log(new Date().toLocaleString() + ' New trap spawned!')
    }, randomValue);
}

let trapDelete = () => {
    setInterval(() => {
        if (screen.querySelector(".trap")) {
            let trapCurentLocation = parseInt(window.getComputedStyle(screen.querySelector(".trap")).getPropertyValue("right"))
            if (trapCurentLocation >= trapDeleteTarget) {
                screen.removeChild(screen.querySelectorAll(".trap")[0]);
                score += 1;
            }
        }
    }, 10);
}

let LoseChecker = () => {
    setInterval(() => {
        if (screen.querySelector(".trap")) {
            let trapCurentLocation = parseInt(window.getComputedStyle(screen.querySelector(".trap")).getPropertyValue("right"))
            let heroCurentLocation = parseInt(window.getComputedStyle(screen.querySelector(".hero")).getPropertyValue("top"))
            if (trapCurentLocation > trapLoseTarget && trapCurentLocation < trapLoseTarget + Math.abs(parseInt(window.getComputedStyle(hero).getPropertyValue('width'))) * 1.5 && heroCurentLocation == heroLoseTarget) {
                scoreResult.innerHTML = score;
                screen.removeChild(screen.querySelector(".trap"));
                // gameOverAudio.play();
                scoreWrapper.classList.add("score-wrapper_active");
                hero.style.animation = "none";
                let audio = document.getElementsByTagName('audio');
                for (i = 0; i < audio.length; i++) {
                    audio[i].pause();
                }
            }
        }
    }, 10);
}

LoseChecker();

trapSpawn();

trapDelete();

window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        jump();
    }
})

PlayAgainBtn.addEventListener("click", function () {
    document.location.reload();
});