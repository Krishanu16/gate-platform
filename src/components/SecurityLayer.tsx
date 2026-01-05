import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useAuth } from '../hooks/useAuth';

interface SecurityLayerProps {
  children: React.ReactNode;
}

export default function SecurityLayer({ children }: SecurityLayerProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { deviceFingerprint } = useAuth();
  const [userIP, setUserIP] = useState<string>('');

  useEffect(() => {
    // Fetch user IP
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch(() => setUserIP('Unknown'));
  }, []);

  useEffect(() => {
    // WebAssembly-based anti-piracy enforcement
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Disable keyboard shortcuts for copy, print, devtools
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, F12, PrintScreen, Ctrl+Shift+I/J/C
      if (
        (e.ctrlKey && ['c', 'p', 's', 'u', 'a'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable print
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection on copy attempt
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('beforeprint', handleBeforePrint, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    document.addEventListener('copy', handleCopy, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('beforeprint', handleBeforePrint, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      document.removeEventListener('copy', handleCopy, { capture: true });
    };
  }, []);

  const isAuthenticated = !!identity;
  const showWatermark = isAuthenticated && userProfile;

  return (
    <div className="relative select-none anti-piracy-root">
      {children}
      {showWatermark && (
        <div className="watermark pointer-events-none">
          <div className="watermark-content">
            {userProfile.email} • {new Date().toLocaleDateString()} • Device: {deviceFingerprint.substring(0, 10)} • IP: {userIP}
          </div>
        </div>
      )}
    </div>
  );
}
