import { 
  Settings, 
  Calculator, 
  AlertTriangle, 
  User, 
  Shield,
  Home
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "setup", label: "Setup", icon: Settings },
    { id: "startup", label: "Startup", icon: Calculator },
    { id: "troubleshooting", label: "Troubleshoot", icon: AlertTriangle },
    { id: "profile", label: "Profile", icon: User },
    { id: "admin", label: "Admin", icon: Shield },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 industrial-panel border-t border-border/50">
      <ScrollArea className="w-full">
        <div className="flex items-center px-2 py-3 max-w-screen-xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`transition-all ${
                  isActive 
                    ? 'scale-110' 
                    : ''
                }`}>
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'font-semibold' : ''
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
};

export default Navigation;