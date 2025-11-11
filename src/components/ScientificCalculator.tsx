import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");

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
      case "^":
        return Math.pow(a, b);
      default:
        return b;
    }
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case "sin":
        result = angleMode === "deg" ? Math.sin(current * Math.PI / 180) : Math.sin(current);
        break;
      case "cos":
        result = angleMode === "deg" ? Math.cos(current * Math.PI / 180) : Math.cos(current);
        break;
      case "tan":
        result = angleMode === "deg" ? Math.tan(current * Math.PI / 180) : Math.tan(current);
        break;
      case "√":
        result = Math.sqrt(current);
        break;
      case "x²":
        result = current * current;
        break;
      case "x³":
        result = current * current * current;
        break;
      case "log":
        result = Math.log10(current);
        break;
      case "ln":
        result = Math.log(current);
        break;
      case "e^x":
        result = Math.exp(current);
        break;
      case "10^x":
        result = Math.pow(10, current);
        break;
      case "1/x":
        result = 1 / current;
        break;
      case "!":
        result = factorial(current);
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      case "±":
        result = -current;
        break;
      default:
        result = current;
    }

    setDisplay(String(result));
    setNewNumber(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
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

  const waterButtonClass = "h-14 text-base font-semibold backdrop-blur-xl bg-gradient-to-br from-water-light/20 to-water-deep/20 border-2 border-water-light/30 hover:border-water-light/60 text-foreground rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] active:scale-95";
  const operatorButtonClass = "h-14 text-lg font-bold backdrop-blur-xl bg-gradient-to-br from-primary/40 to-water/40 border-2 border-water/50 hover:border-water text-primary-foreground rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,200,255,0.6)] active:scale-95";
  const specialButtonClass = "h-14 text-base font-semibold backdrop-blur-xl bg-gradient-to-br from-accent/30 to-secondary/30 border-2 border-accent/40 hover:border-accent/70 text-foreground rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(200,0,255,0.4)] active:scale-95";

  return (
    <div className="w-full max-w-2xl mx-auto backdrop-blur-3xl bg-gradient-to-br from-glass-bg/40 to-water-deep/30 border-2 border-glass-highlight/40 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,200,255,0.3)]">
      {/* Display */}
      <div className="mb-6 p-6 backdrop-blur-xl bg-gradient-to-br from-background/30 to-water-deep/20 rounded-2xl border-2 border-water-light/30 shadow-inner">
        <div className="text-right">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
              className="text-xs text-water-light hover:text-water hover:bg-water/10"
            >
              {angleMode.toUpperCase()}
            </Button>
            <div className="text-sm text-muted-foreground h-5">
              {previousValue && operation && `${previousValue} ${operation}`}
            </div>
          </div>
          <div className="text-4xl font-bold text-foreground break-all min-h-[2.5rem]">
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {/* Scientific Functions Row 1 */}
        <Button onClick={() => handleScientific("sin")} className={specialButtonClass}>sin</Button>
        <Button onClick={() => handleScientific("cos")} className={specialButtonClass}>cos</Button>
        <Button onClick={() => handleScientific("tan")} className={specialButtonClass}>tan</Button>
        <Button onClick={() => handleScientific("log")} className={specialButtonClass}>log</Button>
        <Button onClick={() => handleScientific("ln")} className={specialButtonClass}>ln</Button>
        <Button onClick={handleClear} className="h-14 text-lg font-bold backdrop-blur-xl bg-gradient-to-br from-destructive/40 to-accent/40 border-2 border-destructive/50 hover:border-destructive text-destructive-foreground rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,100,0.5)] active:scale-95">AC</Button>

        {/* Scientific Functions Row 2 */}
        <Button onClick={() => handleScientific("√")} className={specialButtonClass}>√</Button>
        <Button onClick={() => handleScientific("x²")} className={specialButtonClass}>x²</Button>
        <Button onClick={() => handleScientific("x³")} className={specialButtonClass}>x³</Button>
        <Button onClick={() => handleOperation("^")} className={specialButtonClass}>x^y</Button>
        <Button onClick={() => handleScientific("1/x")} className={specialButtonClass}>1/x</Button>
        <Button onClick={handleBackspace} className={specialButtonClass}>⌫</Button>

        {/* Scientific Functions Row 3 */}
        <Button onClick={() => handleScientific("π")} className={specialButtonClass}>π</Button>
        <Button onClick={() => handleScientific("e")} className={specialButtonClass}>e</Button>
        <Button onClick={() => handleScientific("!")} className={specialButtonClass}>n!</Button>
        <Button onClick={() => handleScientific("±")} className={specialButtonClass}>±</Button>
        <Button onClick={() => handleOperation("%")} className={specialButtonClass}>%</Button>
        <Button onClick={() => handleOperation("÷")} className={operatorButtonClass}>÷</Button>

        {/* Number Pad Row 1 */}
        {["7", "8", "9"].map((num) => (
          <Button key={num} onClick={() => handleNumber(num)} className={cn(waterButtonClass, "text-xl")}>
            {num}
          </Button>
        ))}
        <Button onClick={() => handleScientific("e^x")} className={specialButtonClass}>e^x</Button>
        <Button onClick={() => handleScientific("10^x")} className={specialButtonClass}>10^x</Button>
        <Button onClick={() => handleOperation("×")} className={operatorButtonClass}>×</Button>

        {/* Number Pad Row 2 */}
        {["4", "5", "6"].map((num) => (
          <Button key={num} onClick={() => handleNumber(num)} className={cn(waterButtonClass, "text-xl")}>
            {num}
          </Button>
        ))}
        <Button onClick={() => setMemory(memory + parseFloat(display))} className={specialButtonClass}>M+</Button>
        <Button onClick={() => setMemory(memory - parseFloat(display))} className={specialButtonClass}>M-</Button>
        <Button onClick={() => handleOperation("-")} className={operatorButtonClass}>−</Button>

        {/* Number Pad Row 3 */}
        {["1", "2", "3"].map((num) => (
          <Button key={num} onClick={() => handleNumber(num)} className={cn(waterButtonClass, "text-xl")}>
            {num}
          </Button>
        ))}
        <Button onClick={() => { setDisplay(String(memory)); setNewNumber(true); }} className={specialButtonClass}>MR</Button>
        <Button onClick={() => setMemory(0)} className={specialButtonClass}>MC</Button>
        <Button onClick={() => handleOperation("+")} className={operatorButtonClass}>+</Button>

        {/* Bottom Row */}
        <Button onClick={() => handleNumber("0")} className={cn(waterButtonClass, "col-span-2 text-xl")}>0</Button>
        <Button onClick={handleDecimal} className={cn(waterButtonClass, "text-xl")}>.</Button>
        <Button onClick={handleEquals} className="col-span-3 h-14 text-xl font-bold backdrop-blur-xl bg-gradient-to-br from-secondary/50 to-water/50 border-2 border-secondary/60 hover:border-secondary text-secondary-foreground rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(150,0,255,0.6)] active:scale-95">=</Button>
      </div>
    </div>
  );
};
