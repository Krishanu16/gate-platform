import { useEffect, useRef, useState } from 'react';
import { ExternalBlob } from '../backend';
import { Card } from '@/components/ui/card';

interface CanvasContentProps {
  blob: ExternalBlob;
  index: number;
}

export default function CanvasContent({ blob, index }: CanvasContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

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
  }, [blob]);

  if (error) {
    return (
      <Card className="p-4 border-2 border-red-300 bg-red-50">
        <p className="font-handwritten text-red-600">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-2 border-notebook-dark">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`max-w-full h-auto ${isLoading ? 'hidden' : 'block'}`}
        style={{ imageRendering: 'auto' }}
      />
    </Card>
  );
}
