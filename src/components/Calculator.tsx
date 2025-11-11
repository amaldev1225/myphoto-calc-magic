import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const result = calculate(parseFloat(previousValue), current, operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      case "%":
        return a % b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(parseFloat(previousValue), parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto backdrop-blur-2xl bg-glass-bg/30 border border-glass-border/50 rounded-3xl p-8 shadow-2xl">
      {/* Display */}
      <div className="mb-6 p-6 bg-background/20 rounded-2xl border border-glass-border/30">
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1 h-5">
            {previousValue && operation && `${previousValue} ${operation}`}
          </div>
          <div className="text-4xl font-bold text-foreground break-all">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="secondary"
          onClick={handleClear}
          className="h-16 text-lg font-semibold bg-accent/80 hover:bg-accent text-accent-foreground rounded-xl transition-all hover:scale-105"
        >
          AC
        </Button>
        <Button
          variant="secondary"
          onClick={handleBackspace}
          className="h-16 text-lg font-semibold bg-muted/80 hover:bg-muted text-foreground rounded-xl transition-all hover:scale-105"
        >
          ⌫
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleOperation("%")}
          className="h-16 text-lg font-semibold bg-muted/80 hover:bg-muted text-foreground rounded-xl transition-all hover:scale-105"
        >
          %
        </Button>
        <Button
          variant="default"
          onClick={() => handleOperation("÷")}
          className="h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-105"
        >
          ÷
        </Button>

        {/* Row 2 */}
        {["7", "8", "9"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => handleNumber(num)}
            className="h-16 text-xl font-semibold bg-card/50 hover:bg-card border-glass-border/30 text-foreground rounded-xl transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => handleOperation("×")}
          className="h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-105"
        >
          ×
        </Button>

        {/* Row 3 */}
        {["4", "5", "6"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => handleNumber(num)}
            className="h-16 text-xl font-semibold bg-card/50 hover:bg-card border-glass-border/30 text-foreground rounded-xl transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => handleOperation("-")}
          className="h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-105"
        >
          −
        </Button>

        {/* Row 4 */}
        {["1", "2", "3"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => handleNumber(num)}
            className="h-16 text-xl font-semibold bg-card/50 hover:bg-card border-glass-border/30 text-foreground rounded-xl transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => handleOperation("+")}
          className="h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-105"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="outline"
          onClick={() => handleNumber("0")}
          className="col-span-2 h-16 text-xl font-semibold bg-card/50 hover:bg-card border-glass-border/30 text-foreground rounded-xl transition-all hover:scale-105"
        >
          0
        </Button>
        <Button
          variant="outline"
          onClick={handleDecimal}
          className="h-16 text-xl font-semibold bg-card/50 hover:bg-card border-glass-border/30 text-foreground rounded-xl transition-all hover:scale-105"
        >
          .
        </Button>
        <Button
          variant="default"
          onClick={handleEquals}
          className="h-16 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl transition-all hover:scale-105"
        >
          =
        </Button>
      </div>
    </div>
  );
};
