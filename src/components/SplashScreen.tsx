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
        className="relative z-10 cursor-pointer"
        onClick={onContinue}
      >
        {/* Hexagonal logo */}
        <div className="logo">Pro-Processor</div>
      </div>
    </div>
  );
};

export default SplashScreen;
