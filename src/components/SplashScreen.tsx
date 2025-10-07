import { useState, useEffect } from "react";

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen = ({ onContinue }: SplashScreenProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Radial glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />

      <div 
        className="relative z-10 text-center cursor-pointer group"
        onClick={onContinue}
      >
        <div className={`transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Title with metallic effect and glow */}
          <h1 className="text-7xl md:text-8xl font-bold mb-4 shine-effect">
            <span className="metallic-text glow-text inline-block group-hover:scale-105 transition-transform duration-300">
              Pro
            </span>
          </h1>
          
          <h2 className="text-5xl md:text-6xl font-semibold gradient-text-primary glow-text mb-8 group-hover:scale-105 transition-transform duration-300">
            Processor
          </h2>

          {/* Subtle hint text */}
          <p className={`text-muted-foreground text-sm transition-all duration-1000 delay-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            Tap to continue
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-primary/20 rounded-full blur-sm opacity-50 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-accent/20 rounded-full blur-sm opacity-50 group-hover:scale-110 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default SplashScreen;
