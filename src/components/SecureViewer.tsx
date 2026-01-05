import { useEffect, useRef, useState } from 'react';
import { ExternalBlob } from '../backend';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useAuth } from '../hooks/useAuth';
import { Shield, AlertTriangle, Lock } from 'lucide-react';

interface SecureViewerProps {
  blob: ExternalBlob;
  index: number;
}

export default function SecureViewer({ blob, index }: SecureViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userIP, setUserIP] = useState<string>('');
  const [isBlurred, setIsBlurred] = useState(false);
  const [watermarkRotation, setWatermarkRotation] = useState(0);
  const { data: userProfile } = useGetCallerUserProfile();
  const { deviceFingerprint } = useAuth();

  // Fetch user IP
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch(() => setUserIP('Unknown'));
  }, []);

  // Rotating watermark animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkRotation((prev) => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Tab visibility detection with blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // WebAssembly-based anti-piracy enforcement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventActions = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Comprehensive event blocking
    const events = [
      'contextmenu',
      'dragstart',
      'selectstart',
      'copy',
      'cut',
      'paste',
      'mousedown',
      'touchstart',
    ];

    events.forEach((event) => {
      container.addEventListener(event, preventActions, { capture: true });
    });

    // Keyboard shortcut prevention
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, F12, PrintScreen, Ctrl+Shift+I
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

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      events.forEach((event) => {
        container.removeEventListener(event, preventActions, { capture: true });
      });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  // Load and render content with premium watermarking
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const bytes = await blob.getBytes();
        const imageBlob = new Blob([bytes], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);

        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d', { willReadFrequently: false });
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image
          ctx.drawImage(img, 0, 0);

          // Add premium rotating watermark overlay with semi-transparency
          if (userProfile && userIP) {
            const watermarkText = `${userProfile.email} | ${new Date().toLocaleDateString()} | Device: ${deviceFingerprint.substring(0, 10)} | IP: ${userIP}`;

            ctx.save();
            ctx.globalAlpha = 0.12;
            ctx.font = 'bold 28px "Architects Daughter", Arial';
            ctx.fillStyle = '#0f766e';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw watermark in grid pattern with rotation
            const rows = 5;
            const cols = 3;
            for (let row = 0; row < rows; row++) {
              for (let col = 0; col < cols; col++) {
                const x = (canvas.width / (cols + 1)) * (col + 1);
                const y = (canvas.height / (rows + 1)) * (row + 1);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((-45 * Math.PI) / 180);
                ctx.fillText(watermarkText, 0, 0);
                ctx.restore();
              }
            }

            ctx.restore();

            // Add Darcy-style formula boxes for technical content
            ctx.save();
            ctx.strokeStyle = '#0f766e';
            ctx.lineWidth = 3;
            ctx.fillStyle = 'rgba(254, 240, 138, 0.3)';

            // Example formula box (top-right corner)
            const boxX = canvas.width - 320;
            const boxY = 20;
            const boxWidth = 300;
            const boxHeight = 80;

            ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
            ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

            ctx.globalAlpha = 0.8;
            ctx.fillStyle = '#0f766e';
            ctx.font = 'bold 18px "Caveat", cursive';
            ctx.textAlign = 'center';
            ctx.fillText('SECURE CONTENT', boxX + boxWidth / 2, boxY + 25);
            ctx.font = '14px "Architects Daughter", Arial';
            ctx.fillText('Protected by Anti-Piracy System', boxX + boxWidth / 2, boxY + 50);
            ctx.fillText('Unauthorized sharing = Permanent ban', boxX + boxWidth / 2, boxY + 70);

            ctx.restore();
          }

          URL.revokeObjectURL(imageUrl);
          setIsLoading(false);
        };

        img.onerror = () => {
          setError('Failed to load image');
          setIsLoading(false);
          URL.revokeObjectURL(imageUrl);
        };

        img.src = imageUrl;
      } catch (err) {
        setError('Failed to load content');
        setIsLoading(false);
      }
    };

    loadContent();
  }, [blob, userProfile, userIP, deviceFingerprint]);

  return (
    <div ref={containerRef} className="relative select-none anti-piracy-container">
      {/* Sticky Security Header */}
      <div className="sticky top-0 z-50 bg-notebook-dark text-white px-6 py-3 flex items-center justify-center gap-3 border-3 border-notebook-dark shadow-lg">
        <Shield className="w-6 h-6 animate-pulse" />
        <span className="font-handwritten text-xl font-bold tracking-wide">
          SECURE MODE: ACTIVE
        </span>
        <Lock className="w-5 h-5" />
      </div>

      {/* Content Area with Canvas-Only Rendering */}
      <div className="relative border-3 border-notebook-dark bg-white p-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-notebook-dark border-t-transparent"></div>
            <p className="mt-4 font-handwritten text-lg text-notebook-dark">
              Loading secure content...
            </p>
          </div>
        )}

        {error && (
          <div className="p-6 border-3 border-red-500 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <p className="font-handwritten text-lg text-red-600">{error}</p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`max-w-full h-auto mx-auto ${isLoading || error ? 'hidden' : 'block'} ${
            isBlurred ? 'blur-3xl' : ''
          }`}
          style={{
            imageRendering: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        />

        {isBlurred && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="text-center text-white p-8 bg-notebook-dark rounded-lg border-3 border-white">
              <AlertTriangle className="w-20 h-20 mx-auto mb-4 animate-bounce" />
              <p className="font-heading text-4xl mb-2">Content Hidden</p>
              <p className="font-handwritten text-xl">
                Return to this tab to continue viewing
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Rotating Watermark Overlay */}
        {!isLoading && !error && userProfile && (
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
            style={{ zIndex: 10 }}
          >
            <div
              className="font-handwritten text-2xl font-bold text-notebook-dark whitespace-nowrap"
              style={{
                opacity: 0.08,
                transform: `rotate(${watermarkRotation}deg)`,
                transition: 'transform 0.1s linear',
              }}
            >
              {userProfile.email} • {new Date().toLocaleDateString()} • {deviceFingerprint.substring(0, 10)} • {userIP}
            </div>
          </div>
        )}
      </div>

      {/* Warning Banner */}
      <div className="bg-notebook-accent border-3 border-notebook-dark px-6 py-4 flex items-center justify-center gap-3 shadow-lg">
        <AlertTriangle className="w-6 h-6 text-notebook-dark animate-pulse" />
        <span className="font-handwritten text-lg text-notebook-dark font-bold">
          ⚠️ This session is logged. Unauthorized sharing leads to permanent block. ⚠️
        </span>
        <AlertTriangle className="w-6 h-6 text-notebook-dark animate-pulse" />
      </div>
    </div>
  );
}
