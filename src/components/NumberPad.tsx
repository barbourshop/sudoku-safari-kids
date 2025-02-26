
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  onNumberSelect: (number: number) => void;
  disabled: boolean;
}

const NumberPad = ({ onNumberSelect, disabled }: NumberPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 max-w-[240px] mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Button
          key={number}
          onClick={() => onNumberSelect(number)}
          disabled={disabled}
          variant="outline"
          className="w-12 h-12 text-xl font-semibold hover:bg-secondary/20"
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default NumberPad;
