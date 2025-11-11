import { ScientificCalculator } from "@/components/ScientificCalculator";
import backgroundImage from "@/assets/calculator-bg.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-water-deep/30 to-background/50 backdrop-blur-sm" />
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-foreground mb-2 drop-shadow-[0_0_30px_rgba(0,200,255,0.8)]">
            Scientific Calculator
          </h1>
          <p className="text-lg text-water-light drop-shadow-lg">
            Advanced Mathematics • Water Glass Theme
          </p>
        </div>
        <ScientificCalculator />
      </div>
    </div>
  );
};

export default Index;
