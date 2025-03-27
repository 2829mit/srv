let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player X or O
let count = 0; // Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Add event listener to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // Disable after clicking
    count++;

    if (checkWinner()) {
      return; // Stop further execution if we have a winner
    }

    if (count === 9) {
      gameDraw();
    }
  });
});

// Handle game draw scenario
const gameDraw = () => {
  msg.innerText = `Game is a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes after a win/draw
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes and clear values
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Display the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a winning pattern
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;

    let val1 = boxes[pos1].innerText;
    let val2 = boxes[pos2].innerText;
    let val3 = boxes[pos3].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return true; // Stop checking further
    }
  }
  return false; // No winner yet
};

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
