const cards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let firstCard, secondCard;
let stopFlip = false;

function flipCard() {
    if (stopFlip == true) {
        return;
    }
    if (this === firstCard) {
        return;
    }
    this.classList.add('flip');

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.img === secondCard.dataset.img) {
        rightCards();
    }

    else {
        flipBack();
    }
}

function rightCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();

    endGame();
}

function flipBack() {
    stopFlip = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 800);
}

function resetCards() {
    [cardFlipped, stopFlip] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPlace = Math.floor(Math.random() * 12);
        card.style.order = randomPlace;
    });
})();

function resetGame() {
    location.reload();
}

function endGame() {
    if (document.querySelectorAll('.flip').length === cards.length) {
        setTimeout(() => alert('good job you got one hell of a memory'), 500);
        setTimeout(() => resetGame(), 1000);
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));