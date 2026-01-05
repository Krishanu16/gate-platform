import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAuth } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { BookOpen, LogOut, LogIn, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Header() {
  const navigate = useNavigate();
  const { identity, login: iiLogin } = useInternetIdentity();
  const { isAdmin, loginAsAdmin, logout, isLoggingIn } = useAuth();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState<'ii' | 'admin'>('ii');
  const [adminLoginError, setAdminLoginError] = useState('');

  const isAuthenticated = !!identity || isAdmin;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      setShowLoginDialog(true);
      setAdminLoginError('');
    }
  };

  const handleInternetIdentityLogin = async () => {
    try {
      await iiLogin();
      setShowLoginDialog(false);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await logout();
        setTimeout(() => iiLogin(), 300);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    
    if (!username || !password) {
      setAdminLoginError('Please enter both username and password');
      return;
    }

    try {
      const success = await loginAsAdmin(username, password);
      
      if (success) {
        toast.success('Admin login successful!');
        setShowLoginDialog(false);
        setUsername('');
        setPassword('');
        setAdminLoginError('');
        navigate({ to: '/admin' });
      } else {
        // Backend returned false - invalid credentials
        setAdminLoginError('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      setAdminLoginError('Login failed. Please try again.');
    }
  };

  return (
    <>
      <header className="bg-notebook-light border-b-3 border-notebook-dark shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <BookOpen className="w-10 h-10 text-notebook-dark" />
              <div className="text-left">
                <h1 className="font-heading text-3xl md:text-4xl text-notebook-dark leading-tight">
                  GATE Petroleum
                </h1>
                <p className="font-handwritten text-base text-notebook-dark">Engineering 2026</p>
              </div>
            </button>

            <nav className="flex items-center gap-3">
              {isAuthenticated && !isAdmin && userProfile && (
                <>
                  {userProfile.isPaid && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate({ to: '/dashboard' })}
                      className="font-handwritten text-lg hover:bg-notebook-accent text-notebook-dark"
                    >
                      Dashboard
                    </Button>
                  )}
                </>
              )}
              {isAdmin && (
                <Button
                  variant="ghost"
                  onClick={() => navigate({ to: '/admin' })}
                  className="font-handwritten text-lg hover:bg-notebook-accent text-notebook-dark"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Admin
                </Button>
              )}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="font-handwritten text-lg px-6 py-5 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
              >
                {isLoggingIn ? (
                  'Logging in...'
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md border-3 border-notebook-dark bg-white">
          <DialogHeader>
            <DialogTitle className="font-heading text-4xl text-notebook-dark">Login</DialogTitle>
            <DialogDescription className="font-handwritten text-lg text-notebook-dark">
              Choose your login method
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex gap-2 border-2 border-notebook-dark rounded-lg p-1">
              <button
                onClick={() => {
                  setLoginMode('ii');
                  setAdminLoginError('');
                }}
                className={`flex-1 py-2 px-4 rounded font-handwritten text-lg transition-colors ${
                  loginMode === 'ii'
                    ? 'bg-notebook-dark text-white'
                    : 'bg-transparent text-notebook-dark hover:bg-notebook-accent'
                }`}
              >
                Internet Identity
              </button>
              <button
                onClick={() => {
                  setLoginMode('admin');
                  setAdminLoginError('');
                }}
                className={`flex-1 py-2 px-4 rounded font-handwritten text-lg transition-colors ${
                  loginMode === 'admin'
                    ? 'bg-notebook-dark text-white'
                    : 'bg-transparent text-notebook-dark hover:bg-notebook-accent'
                }`}
              >
                Admin Login
              </button>
            </div>

            {loginMode === 'ii' ? (
              <div className="space-y-4">
                <p className="font-handwritten text-base text-notebook-dark">
                  Login with your Internet Identity to access your account.
                </p>
                <Button
                  onClick={handleInternetIdentityLogin}
                  disabled={isLoggingIn}
                  className="w-full font-handwritten text-xl py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="font-handwritten text-lg text-notebook-dark">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setAdminLoginError('');
                    }}
                    placeholder="Enter admin username"
                    className="font-handwritten text-lg border-2 border-notebook-dark py-5"
                    disabled={isLoggingIn}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-handwritten text-lg text-notebook-dark">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAdminLoginError('');
                    }}
                    placeholder="Enter admin password"
                    className="font-handwritten text-lg border-2 border-notebook-dark py-5"
                    disabled={isLoggingIn}
                  />
                </div>
                {adminLoginError && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3">
                    <p className="font-handwritten text-base text-red-700">{adminLoginError}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full font-handwritten text-xl py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login as Admin'}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
