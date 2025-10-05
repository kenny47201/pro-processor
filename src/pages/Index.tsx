import { useState } from "react";
import Navigation from "@/components/Navigation";
import MainSection from "@/components/sections/MainSection";
import SetupSection from "@/components/sections/SetupSection";
import StartupSection from "@/components/sections/StartupSection";
import TroubleshootingSection from "@/components/sections/TroubleshootingSection";
import ProfileSection from "@/components/sections/ProfileSection";
import AdminSection from "@/components/sections/AdminSection";
import LoginForm from "@/components/LoginForm";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <MainSection />;
      case "setup":
        return <SetupSection />;
      case "startup":
        return <StartupSection />;
      case "troubleshooting":
        return <TroubleshootingSection />;
      case "profile":
        return <ProfileSection />;
      case "admin":
        return <AdminSection />;
      default:
        return <MainSection />;
    }
  };

  if (showSplash) {
    return <SplashScreen onContinue={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="p-6 md:p-8">
        {renderSection()}
      </main>
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
    </div>
  );
};

export default Index;
