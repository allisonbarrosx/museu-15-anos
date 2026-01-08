import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface ImageMergerProps {
  mainImageSrc: string;
  watermarkImageSrc: string;
  onMergeComplete?: (dataUrl: string) => void;
}

/**
 * ImageMerger Component
 *
 * Merges a main image with a watermark overlay positioned at bottom-right.
 * Provides a download button for the merged image.
 */
export default function ImageMerger({
  mainImageSrc,
  watermarkImageSrc,
  onMergeComplete,
}: ImageMergerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const mergeImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load both images
        const mainImg = await loadImage(mainImageSrc);
        const watermarkImg = await loadImage(watermarkImageSrc);

        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas reference not found");

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        // Set canvas dimensions to match main image
        canvas.width = mainImg.width;
        canvas.height = mainImg.height;

        // Draw main image
        ctx.drawImage(mainImg, 0, 0);

        // Calculate watermark size (25% of main image width)
        const watermarkWidth = mainImg.width * 0.25;
        const watermarkHeight =
          (watermarkImg.height / watermarkImg.width) * watermarkWidth;

        // // Position watermark at bottom-right with padding
        // const padding = 16;
        // const x = canvas.width - watermarkWidth - padding;
        // const y = canvas.height - watermarkHeight - padding;

        // Position watermark at bottom-center with padding
        const padding = 16;
        const x = (canvas.width - watermarkWidth) / 2;
        const y = canvas.height - watermarkHeight - padding;

        // Draw watermark with 90% opacity
        ctx.globalAlpha = 0.9;
        ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
        ctx.globalAlpha = 1.0;

        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL("image/png");
        setMergedImageUrl(imageUrl);
        onMergeComplete?.(imageUrl);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to merge images";
        setError(errorMessage);
        console.error("Image merge error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    mergeImages();
  }, [mainImageSrc, watermarkImageSrc, onMergeComplete]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Merging images...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
          <p className="text-sm font-medium">Error: {error}</p>
        </div>
      )}

      {/* Success state - show merged image and download button */}
      {mergedImageUrl && !isLoading && (
        <>
          <div className="rounded-lg border border-border overflow-hidden bg-card">
            <img
              src={mergedImageUrl}
              alt="Merged image with watermark"
              className="w-full h-auto"
            />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Helper function to load an image from a URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

    img.src = src;
  });
}
