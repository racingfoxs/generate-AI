import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const ImageCard = ({ generatedImage }) => {
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (generatedImage) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 300);

      if (countdown === 0) {
        setShowImage(true);
        clearInterval(timer); 
      }

      return () => clearInterval(timer); 
    }
  }, [countdown, generatedImage]);

  const imageLoader = ({ src }) => {
    return src;
  };

  return (
    generatedImage && (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generated Image</CardTitle>
        </CardHeader>
        <CardContent>
          {!showImage ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Displaying image in {countdown} seconds...</span>
            </>
          ) : (
            <Image
              loader={imageLoader}
              src={generatedImage}
              alt="Generated"
              width={1024}
              height={1024}
              className="w-full"
              unoptimized
            />
          )}
        </CardContent>
      </Card>
    )
  );
};

export default ImageCard;
