import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const pcPaddle = new Paddle(document.getElementById('pc-paddle'));
const ball = new Ball(document.getElementById('ball'));
const playerScore = document.getElementById('player-score');
const pcScore = document.getElementById('pc-score');
const startGame = document.getElementById('start-game');
const gameBackground = document.getElementById('game-background');
const mobileText = window.matchMedia("(max-width: 768px)");

if (mobileText.matches) {
    startGame.textContent = 'tap to begin!';
} else {
    startGame.textContent = 'press enter to start or tap';
}

let lastTime;
let gameStarted = false;

const lunchGamehandler = (e) => {
    if ((e.key === 'Enter' || e.type === 'touchstart') && !gameStarted) {
        gameStarted = true;
        startGame.style.display = 'none';
        window.requestAnimationFrame(update);
    }
}

// updates the ball movment and the pcPaddle movment
const update = (time) => {
    if (lastTime != null) {
        const delta = time - lastTime;
        const ballY = Math.max(0, Math.min(100, ball.yVar));
        pcPaddle.update(delta, ballY);
        ball.update(delta, [playerPaddle.paddleElement, pcPaddle.paddleElement]);
    }

    if (playerLose()) afterLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

const playerLose = () => {
    const ballBounds = ball.ballBounds();
    return ballBounds.right >= window.innerWidth || ballBounds.left <= 0;
}

const changeBackground = () => {

    const playerPoints = parseInt(playerScore.textContent);

    if (playerPoints < 1) {
        gameBackground.style.backgroundColor = '#001B2E';
    }
    else if (playerPoints < 2) {
        gameBackground.style.backgroundColor = '#00042E';
    }
    else if (playerPoints < 3) {
        gameBackground.style.backgroundColor = '#13002E';
    }
    else if (playerPoints < 4) {
        gameBackground.style.backgroundColor = '#2A002E';
    }
    else if (playerPoints < 5) {
        gameBackground.style.backgroundColor = '#2E001B';
    }
}

const afterLose = () => {
    const ballBounds = ball.ballBounds();
    if (ballBounds.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
        if (parseInt(playerScore.textContent) >= 5) {
            alert('you won , good job');
            resetGame();
        }
    }
    else if (ballBounds.left <= 0) {
        pcScore.textContent = parseInt(pcScore.textContent) + 1;
        if (parseInt(pcScore.textContent) >= 5) {
            alert('you lost nice try tho');
            resetGame();
        }
    }

    changeBackground();
    ball.resetBall();
    pcPaddle.reset();
}

const resetGame = () => {
    window.location.reload();
}

const lunchGame = () => {
    window.addEventListener('keydown', lunchGamehandler);
    window.addEventListener('touchstart', lunchGamehandler);
}

lunchGame();

document.addEventListener('mousemove', e => {
    playerPaddle.position = e.clientY / window.innerHeight * 100;
});

document.addEventListener('touchmove', e => {
    playerPaddle.position = (e.touches[0].clientY / window.innerHeight) * 100;
});