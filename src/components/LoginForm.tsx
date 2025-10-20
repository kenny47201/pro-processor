import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fingerprint, LogIn } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <Card className="w-full max-w-md glass-effect relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-6">
          <CardTitle className="text-5xl font-bold shine-effect">
            <span className="metallic-text">Pro</span>
            <span className="gradient-text-primary block mt-2">Processor</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="bg-input/50 border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-input/50 border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <Button type="submit" className="w-full glow-primary" variant="default">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary/30 hover:border-primary/50 hover:bg-primary/10"
              onClick={onLogin}
            >
              <Fingerprint className="w-6 h-6 mr-2" />
              Fingerprint Scanner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
