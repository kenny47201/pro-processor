import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { ROLE_LABELS, ROLE_ICONS, UserRole } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logoBadge from '@/assets/logo-badge.png';
import processorIcon from '@/assets/processor-login-icon.png';
import toolingIcon from '@/assets/tooling-login-icon.png';

const roleOrder: UserRole[] = [
  'processor',
  'maintenance_tech',
  'tooling_specialist',
  'supervisor',
  'manager',
  'admin',
  'super_admin',
];

const roleDescriptions: Record<UserRole, string> = {
  processor: 'Complete shift tasks, log issues, access knowledge',
  maintenance_tech: 'Resolve issues, create fix records, document solutions',
  tooling_specialist: 'Manage tooling knowledge, create fix records',
  supervisor: 'Create shift tasks, verify fixes, sign off issues',
  manager: 'Full access, approve fixes, manage team',
  admin: 'User management and settings',
  super_admin: 'Cross-tenant access and management',
};

const roleColors: Record<UserRole, string> = {
  processor: 'bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20',
  maintenance_tech: 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20',
  tooling_specialist: 'bg-purple-500/10 text-purple-500 border-purple-500/30 hover:bg-purple-500/20',
  supervisor: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
  manager: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20',
  admin: 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20',
  super_admin: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20',
};

export default function Login() {
  const navigate = useNavigate();
  const { login, getDefaultRoute, isAuthenticated } = useTenant();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [screenName, setScreenName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDefaultRoute(), { replace: true });
    }
  }, [isAuthenticated, navigate, getDefaultRoute]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(screenName, password);
      if (result.error) {
        setError(result.error);
      } else {
        navigate(getDefaultRoute());
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setScreenName('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={logoBadge} 
            alt="Pro-Processor" 
            className="h-28 w-28 mx-auto object-contain"
          />
        </div>

        {!selectedRole ? (
          /* Role Selection */
          <Card>
            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-lg">Select Your Role</CardTitle>
              <CardDescription>Choose your role to continue to login</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {roleOrder.map(role => (
                  <Button
                    key={role}
                    variant="outline"
                    className={`h-auto py-3 flex flex-col items-center gap-1 transition-all ${roleColors[role]}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role === 'processor' ? (
                      <img src={processorIcon} alt="Processor" className="w-10 h-10 object-contain" />
                    ) : role === 'tooling_specialist' ? (
                      <img src={toolingIcon} alt="Tooling Specialist" className="w-[52px] h-[52px] object-contain" />
                    ) : (
                      <span className="text-xl">{ROLE_ICONS[role]}</span>
                    )}
                    <span className="text-xs font-medium">{ROLE_LABELS[role]}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Login Form */
          <Card>
            <CardHeader className="pb-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {selectedRole === 'processor' ? (
                  <img src={processorIcon} alt="Processor" className="w-8 h-8 object-contain" />
                ) : selectedRole === 'tooling_specialist' ? (
                  <img src={toolingIcon} alt="Tooling Specialist" className="w-10 h-10 object-contain" />
                ) : (
                  <span className="text-2xl">{ROLE_ICONS[selectedRole]}</span>
                )}
              </div>
              <CardTitle className="text-lg">{ROLE_LABELS[selectedRole]} Login</CardTitle>
              <CardDescription>{roleDescriptions[selectedRole]}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="screenName">Screen Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="screenName"
                      type="text"
                      placeholder="Enter your screen name"
                      value={screenName}
                      onChange={(e) => setScreenName(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-9"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Need an account? Contact your administrator.
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleBack}
                >
                  ← Back to Role Selection
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
