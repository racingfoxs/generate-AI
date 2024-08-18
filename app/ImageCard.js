import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const ImageCard = ({ generatedImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setLoading(false);
  };

  const handleImageError = () => {
    if (attempt < 3) {
      setAttempt((prev) => prev + 1);
      setIsImageLoaded(false);
      setLoading(true);
    } else {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (generatedImage) {
      setIsImageLoaded(false);
      setAttempt(0);
      setLoading(true);
    }
  }, [generatedImage]);

  return (
    generatedImage && (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generated Image</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!loading && !isImageLoaded && (
            <div className="text-red-500">Failed to load image, check console log.</div>
          )}
          <Image
            src={generatedImage}
            alt="Generated"
            width={1024}
            height={1024}
            className={`w-full`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority
            unoptimized
          />
        </CardContent>
      </Card>
    )
  );
};

export default ImageCard;
