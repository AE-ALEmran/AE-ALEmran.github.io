// ─────────────────────────────────────────────────────────────────────────────
// Client-side Image Compression Utility
// Resizes large images (e.g. 5MB phone photos) down to ~35-60KB JPEG.
// This prevents browser localStorage QuotaExceededError and keeps the site fast.
// ─────────────────────────────────────────────────────────────────────────────

export interface CompressionResult {
  dataUrl: string;
  originalSizeKb: number;
  compressedSizeKb: number;
  compressionRatio: number; // e.g. 95 (percent saved)
}

/**
 * Compresses an image file using an HTML5 Canvas.
 * @param file The uploaded image File.
 * @param maxWidth Max width in pixels (default 800).
 * @param maxHeight Max height in pixels (default 800).
 * @param quality JPEG quality between 0.1 and 1.0 (default 0.82).
 */
export function compressImage(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.82
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const originalSizeKb = Math.round(file.size / 1024);

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image into DOM'));
      img.onload = () => {
        let { width, height } = img;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Draw onto offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback if canvas context fails
          const rawUrl = e.target?.result as string;
          resolve({
            dataUrl: rawUrl,
            originalSizeKb,
            compressedSizeKb: Math.round(rawUrl.length * 0.75 / 1024),
            compressionRatio: 0
          });
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG (much more compact than PNG for photographs)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        const compressedSizeKb = Math.round((compressedDataUrl.length * 0.75) / 1024);
        const compressionRatio = Math.max(
          0,
          Math.round(((originalSizeKb - compressedSizeKb) / originalSizeKb) * 100)
        );

        resolve({
          dataUrl: compressedDataUrl,
          originalSizeKb,
          compressedSizeKb,
          compressionRatio
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
