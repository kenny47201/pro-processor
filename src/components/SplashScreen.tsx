import { useState, useEffect } from "react";
import logoImage from "@/assets/pro-processor-logo.png";

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
      <img 
        src={logoImage}
        alt="Pro-Processor Logo"
        className="logo-image cursor-pointer"
        onClick={onContinue}
      />
    </div>
  );
};

export default SplashScreen;
