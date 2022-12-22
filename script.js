// Set the number of stars and their maximum size
const numStars = 1000;
const maxStarSize = 3;

// Create an array to store the star positions
let stars = [];

// The setup() function is called once when the sketch is started
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);

  // Populate the array with star positions
  for (let i = 0; i < numStars; i++) {
    stars[i] = {
      x: random(windowWidth),
      y: random(windowHeight),
      size: random(maxStarSize),
    };
  }
  
  
  let canvas = document.getElementById("defaultCanvas0");
  canvas.style.zIndex = "0";
  canvas.style.position = "absolute";
  canvas.style.highlightThickness = "0";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// The draw() function is called repeatedly by p5.js
function draw() {
  // Set the background color to black
  background(0);

  // Loop through the stars array and draw each star
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];

    // Set the fill color to white
    fill(255);

    // Draw the star at its position, with its size
    ellipse(star.x, star.y, star.size);

    // Update the star's position, making it appear to move
    star.x -= star.size / 2;
    star.y -= star.size / 15;
    star.size = 1.001 * star.size

    // If the star has moved off the left edge of the canvas,
    // move it to the right edge
    if (star.x < 0) {
      star.x = width;
      star.size = random(maxStarSize);
    }
    if (star.y < 0) {
      star.y = width;
      star.size = random(maxStarSize);
    }
  }
}



let solution;
let puzzle = [];
// Create a 9x9 grid for the Sudoku puzzle
function createSudokuGrid() {
  // Initialize an empty 2D array to store the Sudoku puzzle
  let puzzle = [];
  for (let i = 0; i < 9; i++) {
    puzzle[i] = [];
  }

  // Choose a random solvable Sudoku puzzle and input enough answers to make it solvable to the user
  // You can use a Sudoku puzzle generator to do this
  // For the purpose of this example, we will use a pre-defined puzzle
  puzzle = generateSudokuu();

  // Randomly remove some of the values from the puzzle to create a puzzle for the user to solve
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      // Use a random number between 0 and 1 to decide whether to remove the value
      if (Math.random() < 0.5) {
        puzzle[i][j] = 0;
        check = puzzle;
      }
    }
  }

  // Create a table element to hold the Sudoku puzzle
  let table = document.createElement("table");
  table.setAttribute("id", "sudoku-grid");
  
  // Set the style of the table element to center it on the page
  table.style.transform = "translate(-50%, -50%)";
  table.style.position = "absolute";
  table.style.top = "50%";
  table.style.left = "50%";
  table.style.width = "300px";
  table.style.height = "300px";

// Set the style of the table element to center it on the page whenever the window is resized
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  window.addEventListener("resize", function() {
    table.style.transform = "translate(-50%, -50%)";
    table.style.position = "absolute";
    table.style.top = "50%";
    table.style.left = "50%";
	if (windowWidth < 400) {
	    table.style.width = "200px";
	    table.style.height = "200px";
	  } else {
	    table.style.width = "300px";
	    table.style.height = "300px";
	  }
  });

  

  // Loop through the 2D array and create a cell for each value
  for (let i = 0; i < puzzle.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < puzzle[i].length; j++) {
      let cell = document.createElement("td");
      
      // Set the style of the cell
      cell.style.color = "black";
      cell.style.backgroundColor = "white";
      cell.style.border = ".25px solid white";
      cell.style.padding = "1px";
      cell.style.textAlign = "center";
      cell.style.verticalAlign = "middle";
      cell.style.width = "30px";
      cell.style.height = "30px";

      // If the cell is in the first row or first column, or the index is divisible by 3, add a thicker border to the cell
      if (i === 0 || i % 3 === 0) {
        cell.style.borderTop = "4px solid red";
      }
      if (i === 8){
        cell.style.borderBottom = "4px solid red";
      }

      // If the cell is in the first row or first column, or the index is divisible by 3, add a thicker border to the cell
      if (j === 0 || j % 3 === 0) {
        cell.style.borderLeft = "4px solid red";
      }
      if (j === 8){
        cell.style.borderRight = "4px solid red";
      }

      // If the value in the cell is not 0, add it to the cell as text
      if (puzzle[i][j] !== 0) {
        let cellText = document.createTextNode(puzzle[i][j]);
        cell.appendChild(cellText);
      } else {
        // Otherwise, create an input field for the user to enter a value
        let inputField = document.createElement("input");
        inputField.setAttribute("type", "text");
        inputField.setAttribute("maxlength", "1");
        inputField.style.width = "30px";
        inputField.style.height = "30px";
        inputField.style.textAlign = "center";
        inputField.style.color = "black";
        inputField.style.backgroundColor = "white";
  
        cell.appendChild(inputField);
      }

      row.appendChild(cell);
    }
    table.appendChild(row);
	document.body.appendChild(table);
  }

  // Add the table to the page
  
  
  // Add a submit button to check the user's solution
  
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "button");
  buttonContainer.style.position = "absolute";
  buttonContainer.style.textAlign = "center";
  buttonContainer.style.top = "85%";
  buttonContainer.style.left = "50%";
  buttonContainer.style.transform = "translate(-50%, -85%)";
  buttonContainer.style.zIndex = "5";

  // Add the container element to the document
  
  
  let submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.setAttribute("id", "submit-button");
  submitButton.addEventListener("click", checkSolution);
  buttonContainer.appendChild(submitButton);
  
  document.body.appendChild(buttonContainer);
  
}

// Check the user's solution to the puzzle
function checkSolution() {
  // Get the table element and the input fields
  let table = document.getElementById("sudoku-grid");
  let inputFields = table.getElementsByTagName("input");

  // Loop through the input fields and check if the value is correct
  for (let i = 0; i < inputFields.length; i++) {
    let row = inputFields[i].parentElement.parentElement.rowIndex;
    let col = inputFields[i].parentElement.cellIndex;
    let value = inputFields[i].value;

    // If the value is incorrect, show an alert and return
    value = value || 0;
    if (solution[row][col] == 0 || value != solution[row][col]) {
      alert("Your solution is incorrect. Please try again.");
      return;
    }
  }

  // If all values are correct, show an alert and return
  alert("Congratulations! Your solution is correct.");
  return;
}

function generateSudokuu() {
  // Initialize the board with all zeros
  board = Array(9).fill().map(() => Array(9).fill(0));

  // Set up a list of available numbers for each cell
  let availableNumbers = Array(9).fill().map(() => Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9]));

  // Fill in the board using backtracking
  if (backtrack(board, availableNumbers, 0, 0)) {
    // Randomly remove values from the puzzle until it has a unique solution
    while (true) {
      // Make a copy of the board
      let copy = board.map(row => row.slice());
        // Choose a random cell to remove
  let row = Math.floor(Math.random() * 9);
  let col = Math.floor(Math.random() * 9);
  // If the cell is already empty, skip it
  if (copy[row][col] == 0) {
    continue;
  }
  // Remove the value from the cell
  copy[row][col] = 0;
  // Check if the puzzle has a unique solution
  if (hasUniqueSolution(copy)) {
    // If the puzzle has a unique solution, store the copy as the result
    board = copy;
  } else {
    // If the puzzle does not have a unique solution, stop removing values
    break;
  }
}
return board;
  }}


function generateSudoku() {
  // Initialize the board with all zeros
  board = Array(9).fill().map(() => Array(9).fill(0));

  // Set up a list of available numbers for each cell
  let availableNumbers = Array(9).fill().map(() => Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9]));

  // Fill in the board using backtracking
  if (backtrack(board, availableNumbers, 0, 0)) {
    return board;
  } else {
    console.log("Failed to generate sudoku board");
  }
}

function backtrack(board, availableNumbers, row, col) {
  // If we have reached the end of the board, the board is complete
  if (row == 9) {
    return true;
  }

  // If the current cell is not empty, move to the next cell
  if (board[row][col] != 0) {
    if (col == 8) {
      if (backtrack(board, availableNumbers, row + 1, 0)) {
        return true;
      }
    } else {
      if (backtrack(board, availableNumbers, row, col + 1)) {
        return true;
      }
    }
    return false;
  }

  // Randomly shuffle the available numbers for the current cell
  availableNumbers[row][col] = shuffle(availableNumbers[row][col]);

  // Try filling in the current cell with each available number
  for (let i = 0; i < availableNumbers[row][col].length; i++) {
    let num = availableNumbers[row][col][i];

    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (col == 8) {
        if (backtrack(board, availableNumbers, row + 1, 0)) {
          return true;
        }
      } else {
        if (backtrack(board, availableNumbers, row, col + 1)) {
          return true;
        }
      }
      board[row][col] = 0;
    }
  }

  return false;
}

function isValid(board, row, col, num) {
  // Check if the number is already used in the current row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num) {
      return false;
    }
  }

  // Check if the number is already used in the current column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == num) {
      return false;
    }
  }

  // Check if the number is already used in the current 3x3 subgrid
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] == num) {
        return false;
      }
    }
  }
  solution = board;
  return true;
}

// Function to shuffle an array in place
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function hasUniqueSolution(puzzle) {
  // Initialize a list of available numbers for each cell
  let availableNumbers = Array(9).fill().map(() => Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9]));

  // Try solving the puzzle using backtracking
  if (backtrack(puzzle, availableNumbers, 0, 0)) {
    // If the puzzle can be solved, check if there is a second solution
    let copy = JSON.parse(JSON.stringify(puzzle));
    if (backtrack(copy, availableNumbers, 0, 0)) {
      // If the puzzle has a second solution, return false
      return false;
    }
    // If the puzzle has a unique solution, return true
    return true;
  }
  // If the puzzle cannot be solved, return false
  return false;
}


// Call the createSudokuGrid function to create the puzzle
createSudokuGrid();
