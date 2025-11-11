import { Calculator } from "@/components/Calculator";
import backgroundImage from "@/assets/calculator-bg.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-2 drop-shadow-lg">
            Calculator
          </h1>
          <p className="text-lg text-foreground/80">
            Simple & Beautiful
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
