import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import proProcessorLogo from "@/assets/pro-processor-login.png";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [hasBiometricsRegistered, setHasBiometricsRegistered] = useState(false);
  const [isCheckingBiometrics, setIsCheckingBiometrics] = useState(true);
  const { toast } = useToast();

  // Check if biometrics are available and registered
  useEffect(() => {
    const checkBiometrics = async () => {
      // Check if WebAuthn is supported
      if (window.PublicKeyCredential) {
        setBiometricsAvailable(true);
        
        // Check if user has registered biometrics before
        const registered = localStorage.getItem('biometricsRegistered') === 'true';
        setHasBiometricsRegistered(registered);
        
        // Auto-prompt biometrics for returning users
        if (registered) {
          try {
            await authenticateWithBiometrics();
          } catch (error) {
            console.error('Biometric auth failed:', error);
            // Silently fall back to password login
          }
        }
      }
      setIsCheckingBiometrics(false);
    };

    checkBiometrics();
  }, []);

  const authenticateWithBiometrics = async () => {
    try {
      // In a real implementation, this would call your backend to get a challenge
      // and verify the credential. For now, we'll simulate biometric auth.
      
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32), // Should come from your server
        timeout: 60000,
        rpId: window.location.hostname,
        userVerification: "required",
      };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      }) as PublicKeyCredential;

      if (credential) {
        toast({
          title: "Biometric authentication successful",
          description: "Logging you in...",
        });
        onLogin();
      }
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        toast({
          title: "Biometric authentication cancelled",
          description: "Please sign in with your password",
          variant: "destructive",
        });
      } else {
        throw error;
      }
    }
  };

  const registerBiometrics = async () => {
    try {
      // In a real implementation, this would call your backend to create credentials
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32), // Should come from your server
        rp: {
          name: "Pro Processor",
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16), // Should be user's ID from your database
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },  // ES256
          { alg: -257, type: "public-key" } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      if (credential) {
        localStorage.setItem('biometricsRegistered', 'true');
        setHasBiometricsRegistered(true);
        toast({
          title: "Biometrics registered",
          description: "You can now use biometric authentication",
        });
      }
    } catch (error: any) {
      toast({
        title: "Biometric registration failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First try biometric if available and user wants to register
    if (biometricsAvailable && !hasBiometricsRegistered) {
      const shouldRegister = confirm("Would you like to enable biometric login for faster access next time?");
      if (shouldRegister) {
        await registerBiometrics();
      }
    }
    
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <Card className="w-full max-w-md glass-effect relative z-10 animate-fade-in">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center">
            <img src={proProcessorLogo} alt="Pro Processor" className="w-full max-w-md" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isCheckingBiometrics ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Fingerprint className="w-12 h-12 animate-pulse text-primary" />
              <p className="text-muted-foreground">Checking biometric authentication...</p>
            </div>
          ) : (
            <>
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
                
                <Button 
                  type="submit" 
                  className="w-full glow-primary" 
                  variant="default"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>

              {biometricsAvailable && hasBiometricsRegistered && (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={authenticateWithBiometrics}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Use biometric authentication
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;