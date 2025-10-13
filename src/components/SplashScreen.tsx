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
      <div className="logo cursor-pointer" onClick={onContinue}>
        PRO-PROCESSOR
      </div>
    </div>
  );
};

export default SplashScreen;
