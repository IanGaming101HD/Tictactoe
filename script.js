let boxes = Array.from(document.getElementsByClassName('box'));
let difficulty = 'Play against a friend';
let players = {
  x: { symbol: '✖', score: 0 },
  o: { symbol: '𐤏', score: 0 },
};
let playersTurn = players['x'].symbol;

let difficultyNode = document.getElementById('difficulty');
let playerTurnNode = document.getElementById('players-turn');

difficultyNode.innerText = difficulty;
playerTurnNode.innerText = playersTurn;

function formatString(string) {
  return (
    string[0].toUpperCase() + string.slice(1).toLowerCase().replace(/-/g, ' ')
  );
}

function nextTurn(playersTurn) {
  symbol = playersTurn;

  if (symbol === players['x'].symbol) {
    symbol = players['o'].symbol;
  } else {
    symbol = players['x'].symbol;
  }

  let playersTurnNode = document.getElementById('players-turn');
  playersTurnNode.innerText = symbol;
  return symbol;
}

function checkGrid(boxes, player, element) {
  let a1 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row1') &&
      Object.values(element.classList).includes('column1')
  ).innerText;
  let a2 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row1') &&
      Object.values(element.classList).includes('column2')
  ).innerText;
  let a3 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row1') &&
      Object.values(element.classList).includes('column3')
  ).innerText;
  let b1 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row2') &&
      Object.values(element.classList).includes('column1')
  ).innerText;
  let b2 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row2') &&
      Object.values(element.classList).includes('column2')
  ).innerText;
  let b3 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row2') &&
      Object.values(element.classList).includes('column3')
  ).innerText;
  let c1 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row3') &&
      Object.values(element.classList).includes('column1')
  ).innerText;
  let c2 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row3') &&
      Object.values(element.classList).includes('column2')
  ).innerText;
  let c3 = boxes.find(
    (element) =>
      Object.values(element.classList).includes('row3') &&
      Object.values(element.classList).includes('column3')
  ).innerText;

  if (
    [a1, a2, a3].every((element) => element === player) ||
    [b1, b2, b3].every((element) => element === player) ||
    [c1, c2, c3].every((element) => element === player) ||
    [a1, b1, c1].every((element) => element === player) ||
    [a2, b2, c2].every((element) => element === player) ||
    [a3, b3, c3].every((element) => element === player) ||
    [a1, b2, c3].every((element) => element === player) ||
    [a3, b2, c1].every((element) => element === player)
  ) {
    winner(getPlayerFromSymbol(player));
  } else if (!boxes.find((element) => element.innerText === '')) {
    draw();
  }
}

function getPlayerFromSymbol(symbol) {
  for (let player in players) {
    if (players[player].symbol === symbol) {
      return player;
    }
  }
  return null;
}

function winner(player) {
  players[player].score += 1;
  document.getElementById(`${player}-score`).innerText = players[player].score;
  gameEndedMessage(players[player].symbol, 'WINNER!');
  return player;
}

function draw() {
  gameEndedMessage(`${players['x'].symbol}${players['o'].symbol}`, 'DRAW!');
  return `${players['x'].symbol}${players['o'].symbol}`;
}

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}

function lockBoard() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function unlockBoard() {
  boxes.forEach((box) => {
    box.disabled = false;
  });
}

function clearBoard() {
  boxes.forEach((box) => {
    box.innerText = '';
  });
}

function gameEndedMessage(winner, message) {
  let popupContainer = document.getElementById('popup-container');
  showElement(popupContainer);
  lockBoard();

  let winnerNode = document.getElementById('winner');
  winnerNode.innerText = winner;

  let outcome = document.getElementById('outcome');
  outcome.innerText = message;
}

boxes.forEach((box) => {
  box.addEventListener('click', (event) => {
    if (box.innerText === '') {
      box.innerText = playersTurn;
      checkGrid(boxes, playersTurn, box);
      playersTurn = nextTurn(playersTurn);
    }
  });
});

let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', (event) => {
  clearBoard();
  players['x'].score = 0;
  players['o'].score = 0;
  let playerXScore = document.getElementById('x-score');
  let playerOScore = document.getElementById('o-score');
  playerXScore.innerText = 0;
  playerOScore.innerText = 0;
});

let toggleExpansionButton = document.getElementById('toggle-expansion-button');
toggleExpansionButton.addEventListener('click', (event) => {
  let expansionContainer = document.getElementById('expansion-container');
  if (toggleExpansionButton.innerText === 'v') {
    toggleExpansionButton.innerText = '^';
    showElement(expansionContainer);
  } else if (toggleExpansionButton.innerText === '^') {
    toggleExpansionButton.innerText = 'v';
    hideElement(expansionContainer);
  }
});

let difficultyButtons = Array.from(
  document.getElementsByClassName('difficulty')
);
difficultyButtons.forEach((element) => {
  element.addEventListener('click', (event) => {
    let mode = event.target.id;
    difficulty = formatString(mode);
    difficultyNode.innerText = difficulty;
  });
});

let closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', (event) => {
  let popupContainer = document.getElementById('popup-container');
  hideElement(popupContainer);
  clearBoard();
  unlockBoard();
});

let continueButton = document.getElementById('continue-button');
continueButton.addEventListener('click', (event) => {
  let popupContainer = document.getElementById('popup-container');
  hideElement(popupContainer);
  clearBoard();
  unlockBoard();
});
