// Array of card contents (pairs of letters or images)
const cards = [
  { id: 1, content: 'HTML' }, { id: 2, content: 'HTML' },
  { id: 3, content: 'CSS' }, { id: 4, content: 'CSS' },
  { id: 5, content: 'JS' }, { id: 6, content: 'JS' },
  { id: 7, content: 'ReactJS' }, { id: 8, content: 'ReactJS' },
  { id: 9, content: 'NodeJS' }, { id: 10, content: 'NodeJS' },
  { id: 11, content: 'MongoDB' }, { id: 12, content: 'MongoDB' },
];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let attempts = 0;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const attemptsCounter = document.getElementById('attempts');
const restartButton = document.getElementById('restartButton');

// Shuffle the cards array using Fisher-Yates Shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create card elements
function createCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${cardData.content}</div>
    </div>
  `;
  card.addEventListener('click', () => flipCard(card, cardData));
  return card;
}

// Flip card logic
function flipCard(cardElement, cardData) {
  if (lockBoard || cardElement.classList.contains('flipped')) return;
  cardElement.classList.add('flipped');

  if (!firstCard) {
    firstCard = { cardElement, cardData };
  } else {
    secondCard = { cardElement, cardData };
    lockBoard = true;
    attempts++;
    attemptsCounter.textContent = attempts;

    if (firstCard.cardData.content === secondCard.cardData.content) {
      disableMatchedCards();
    } else {
      setTimeout(unflipCards, 1000);
    }
  }
}

// Keep matched cards flipped
function disableMatchedCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Flip cards back if they do not match
function unflipCards() {
  firstCard.cardElement.classList.remove('flipped');
  secondCard.cardElement.classList.remove('flipped');
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Initialize game
function initGame() {
  gameBoard.innerHTML = '';
  shuffledCards = shuffle([...cards]);
  shuffledCards.forEach(cardData => {
    gameBoard.appendChild(createCard(cardData));
  });
  attempts = 0;
  attemptsCounter.textContent = attempts;
}

// Restart game on button click
restartButton.addEventListener('click', initGame);

// Start the game when the page loads
initGame();
