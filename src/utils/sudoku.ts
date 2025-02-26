
// Function to check if a number is valid in a given position
export const isValid = (
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

// Function to generate a solved Sudoku board
const generateSolvedBoard = (): number[][] => {
  const board: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  const fillBoard = (board: number[][]): boolean => {
    let row = 0;
    let col = 0;
    let isEmpty = false;

    for (let i = 0; i < 81; i++) {
      row = Math.floor(i / 9);
      col = i % 9;

      if (board[row][col] === 0) {
        isEmpty = true;
        break;
      }
    }

    if (!isEmpty) return true;

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(board)) return true;
        board[row][col] = 0;
      }
    }

    return false;
  };

  fillBoard(board);
  return board;
};

// Function to generate a puzzle by removing numbers from a solved board
export const generatePuzzle = (): { puzzle: number[][]; solution: number[][] } => {
  const solution = generateSolvedBoard();
  const puzzle = solution.map((row) => [...row]);
  const cellsToRemove = 40; // Adjust difficulty by changing this number

  let count = 0;
  while (count < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }

  return { puzzle, solution };
};

// Function to check if the current board state matches the solution
export const checkSolution = (
  board: number[][],
  solution: number[][]
): boolean => {
  return board.every((row, i) =>
    row.every((cell, j) => cell === solution[i][j])
  );
};

// Function to check if a specific cell's value is correct
export const isCellValid = (
  board: number[][],
  solution: number[][],
  row: number,
  col: number
): boolean => {
  return board[row][col] === solution[row][col];
};
