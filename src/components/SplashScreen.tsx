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
    <div className="splash-container">
      {/* Animated hex background */}
      <div className="hex-grid" />
      
      {/* Pulsing glow */}
      <div className="pulse-glow-bg" />
      
      <div 
        className="logo cursor-pointer"
        onClick={onContinue}
      >
        Pro-Processor
      </div>
    </div>
  );
};

export default SplashScreen;
