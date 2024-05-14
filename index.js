const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status-text");
const resetButton = document.querySelector("#restart-button");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();
function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  resetButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  //   console.log(cellIndex);
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (currentPlayer === "X") {
    cell.classList.add("X");
  } else {
    cell.classList.add("O");
  }
  // changePlayer();
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWin = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    // console.log(condition)
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    // console.log(cellA);

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWin = true;
      break;
    }
  }
  if(roundWin){
    statusText.textContent = `${currentPlayer}'s victory`
    running=false
  }else if (!options.includes('')){
    statusText.textContent=`Draw!`
    running = false
  }else{
    changePlayer()
  }
}
function restartGame() {
  location.reload();
  //code below works but it has a bug in color
  // currentPlayer ='X'
  // options = ["", "", "", "", "", "", "", "", ""];
  // statusText.textContent = `${currentPlayer}'s turn `
  // cells.forEach(cell => cell.textContent = '')
  // running =true
}
