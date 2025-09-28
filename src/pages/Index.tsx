import { useState } from "react";
import Navigation from "@/components/Navigation";
import MainSection from "@/components/sections/MainSection";
import SetupSection from "@/components/sections/SetupSection";
import StartupSection from "@/components/sections/StartupSection";
import TroubleshootingSection from "@/components/sections/TroubleshootingSection";
import ProfileSection from "@/components/sections/ProfileSection";
import AdminSection from "@/components/sections/AdminSection";
import LoginForm from "@/components/LoginForm";

const Index = () => {
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

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 md:ml-0 p-6 md:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
