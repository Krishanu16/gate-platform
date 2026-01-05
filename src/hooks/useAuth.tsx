import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import { useGetCallerUserProfile, useRecordDeviceFingerprint, useVerifyDeviceFingerprint } from './useQueries';
import { generateDeviceFingerprint } from '../lib/deviceFingerprint';
import { toast } from 'sonner';

type AuthContextType = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  loginAsAdmin: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoggingIn: boolean;
  deviceFingerprint: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, clear: clearII, isLoggingIn: iiLoggingIn } = useInternetIdentity();
  const { actor } = useActor();
  const { data: userProfile } = useGetCallerUserProfile();
  const recordDevice = useRecordDeviceFingerprint();
  const verifyDevice = useVerifyDeviceFingerprint();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [deviceFingerprint] = useState(() => generateDeviceFingerprint());

  const isAuthenticated = !!identity || isAdmin;

  // Handle device fingerprint verification on login
  useEffect(() => {
    const handleDeviceVerification = async () => {
      if (!isAuthenticated || !userProfile || !actor) return;

      try {
        // Try to verify device fingerprint
        await verifyDevice.mutateAsync({
          deviceFingerprint,
          sessionToken: userProfile.sessionToken,
        });
      } catch (error: any) {
        if (error.message?.includes('first login')) {
          // First login - record the device
          try {
            await recordDevice.mutateAsync({
              deviceFingerprint,
              sessionToken: userProfile.sessionToken,
            });
          } catch (recordError: any) {
            console.error('Failed to record device:', recordError);
          }
        } else if (error.message?.includes('locked to another device')) {
          // Device mismatch - show error and logout
          toast.error('This account is locked to another device. Contact Admin to reset.');
          await logout();
        }
      }
    };

    handleDeviceVerification();
  }, [isAuthenticated, userProfile, actor, deviceFingerprint]);

  const loginAsAdmin = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      if (!actor) {
        throw new Error('Actor not available');
      }

      setIsLoggingIn(true);
      try {
        // Call backend adminLogin with credentials
        const result = await actor.adminLogin(username, password);
        
        if (result === true) {
          // Backend returned true - credentials are valid
          setIsAdmin(true);
          return true;
        } else {
          // Backend returned false - invalid credentials
          return false;
        }
      } catch (error: any) {
        console.error('Admin login error:', error);
        // If there's an error (not just false), still return false
        return false;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [actor]
  );

  const logout = useCallback(async () => {
    if (isAdmin) {
      setIsAdmin(false);
    }
    if (identity) {
      await clearII();
    }
  }, [isAdmin, identity, clearII]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        loginAsAdmin,
        logout,
        isLoggingIn: isLoggingIn || iiLoggingIn,
        deviceFingerprint,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
