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
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(circle, #0c1a0c 0%, #010101 100%)' }}>
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
