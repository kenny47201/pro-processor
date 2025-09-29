import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Settings, 
  Calculator, 
  AlertTriangle, 
  User, 
  Shield,
  Menu,
  X 
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "setup", label: "Setup Sheets", icon: Settings },
    { id: "startup", label: "Sample/Startup", icon: Calculator },
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle },
    { id: "profile", label: "User Profile", icon: User },
    { id: "admin", label: "Admin Panel", icon: Shield },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="glass-effect"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <Card className={`
        fixed md:static top-0 left-0 h-full w-64 p-6 
        transform transition-transform duration-300 z-40
        industrial-panel
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-xl font-bold gradient-text-primary">
              Injection Molding
            </h1>
            <p className="text-sm text-muted-foreground">Control Center</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3 transition-industrial"
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Manufacturing Control v1.0
            </p>
          </div>
        </div>
      </Card>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;