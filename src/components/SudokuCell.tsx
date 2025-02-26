
import { cn } from "@/lib/utils";

interface SudokuCellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  isValid: boolean;
  onClick: () => void;
}

const SudokuCell = ({
  value,
  isInitial,
  isSelected,
  isValid,
  onClick,
}: SudokuCellProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full flex items-center justify-center text-2xl font-semibold transition-all duration-200",
        "border-r border-b border-slate-200 last:border-r-0",
        "focus:outline-none focus:ring-2 focus:ring-secondary",
        isSelected && "bg-secondary/30",
        !isInitial && "animate-number-pop",
        value !== 0 && !isValid && "text-error",
        isInitial ? "text-primary font-bold bg-slate-50" : "text-slate-600"
      )}
    >
      {value !== 0 ? value : ""}
    </button>
  );
};

export default SudokuCell;
