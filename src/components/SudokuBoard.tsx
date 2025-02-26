
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SudokuCell from "./SudokuCell";
import NumberPad from "./NumberPad";
import {
  generatePuzzle,
  isCellValid,
  checkSolution,
} from "@/utils/sudoku";

const SudokuBoard = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    const { puzzle, solution } = generatePuzzle();
    setBoard(puzzle.map((row) => [...row]));
    setSolution(solution);
    setInitialBoard(
      puzzle.map((row) => row.map((cell) => cell !== 0))
    );
    setSelectedCell(null);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!initialBoard[row][col]) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberSelect = (number: number) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = number;
    setBoard(newBoard);

    const complete = checkSolution(newBoard, solution);
    if (complete) {
      setIsComplete(true);
      toast({
        title: "Congratulations!",
        description: "You've completed the puzzle!",
        className: "bg-success text-success-foreground",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold text-primary">Sudoku Safari</h1>
        <Button
          onClick={initializeGame}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-9 aspect-square w-full max-w-[500px] border border-slate-200">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "border-r border-b border-slate-200",
                (colIndex + 1) % 3 === 0 && colIndex !== 8 && "border-r-primary border-r-2",
                (rowIndex + 1) % 3 === 0 && rowIndex !== 8 && "border-b-primary border-b-2"
              )}
            >
              <SudokuCell
                value={cell}
                isInitial={initialBoard[rowIndex][colIndex]}
                isSelected={
                  selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
                }
                isValid={
                  cell === 0 ||
                  isCellValid(board, solution, rowIndex, colIndex)
                }
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            </div>
          ))
        )}
      </div>

      <NumberPad
        onNumberSelect={handleNumberSelect}
        disabled={!selectedCell || isComplete}
      />
    </div>
  );
};

export default SudokuBoard;
