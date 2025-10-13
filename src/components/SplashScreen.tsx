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
    <div className="min-h-screen bg-gradient-radial from-[#0a120a] to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated hex grid background */}
      <div className="absolute inset-0 hex-grid z-0 opacity-25" />
      
      {/* Pulsing energy glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full energy-glow z-[1]" />

      <div 
        className="relative z-10 cursor-pointer group"
        onClick={onContinue}
      >
        <div className={`transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Hexagonal logo */}
          <div className="hexagonal-logo group-hover:scale-105 transition-all duration-400">
            <div className="hexagonal-logo-inner" />
            <div className="hexagonal-logo-content">
              <span className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider uppercase">
                Pro-Processor
              </span>
            </div>
          </div>

          {/* Subtle hint text */}
          <p className={`text-muted-foreground text-sm text-center mt-8 transition-all duration-1000 delay-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            Tap to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
