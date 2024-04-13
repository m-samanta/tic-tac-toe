const boardSquares = document.querySelectorAll(".board__square");
const title = document.querySelector("h1");
const firstMovePicks = document.querySelectorAll(".first__move__x, .first__move__o");
let currentPlayer = "X";

let currentBoard = new Array(9).fill(null);
let gameOver = false;


firstMovePicks.forEach((firstMovePick) => {
  firstMovePick.addEventListener("input", () => {
    currentPlayer = firstMovePick.value;
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

boardSquares.forEach((square, i) => {
  square.addEventListener("click", () => {
    if (square.innerHTML || gameOver) {
      return;
    }

    square.innerHTML = currentPlayer;
    currentBoard[i] = currentPlayer;

    firstMovePicks[0].disabled = true
    firstMovePicks[1].disabled = true
 
    if (checkWin()) {
      title.innerHTML = `${currentPlayer} Wins`;
      return (gameOver = true);
    }

    if (checkDraw()) {
      title.innerHTML = "Draw";
      return (gameOver = true);
    }

    currentPlayer = currentPlayer === "O" ? "X" : "O";
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function checkDraw() {
  return currentBoard.every((square) => {
    if (square) {
      return true;
    }
  });

  // for(const square of currentBoard){
  //   if(!square){
  //     return false;
  //   }
  // }
  // return true;
}

function checkWin() {
  const winningIndexes = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const winningScenario of winningIndexes) {
    let symbol1 = currentBoard[winningScenario[0]];
    let symbol2 = currentBoard[winningScenario[1]];
    let symbol3 = currentBoard[winningScenario[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      return true;
    }
  }
}

function restartGame() {
  gameOver = false;
  currentPlayer = "X"
  title.innerHTML = `${currentPlayer}'s Turn`;
  boardSquares.forEach((square) => (square.innerHTML = ""));
  currentBoard = new Array(9).fill(null);
  firstMovePicks[0].checked = true
  firstMovePicks[0].disabled = false
  firstMovePicks[1].disabled = false
}
