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
      <div className="logo-hexagon cursor-pointer" onClick={onContinue}>
        <div className="logo-text">
          <div>PRO-</div>
          <div>PROCESSOR</div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
