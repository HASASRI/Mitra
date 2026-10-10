// Utility to read, compress, and resize user-uploaded profile pictures safely

export const compressAndFormatProfileImage = (
  file: File,
  callback: (dataUrl: string) => void,
  maxDimension = 320,
  quality = 0.85
): void => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawResult = e.target?.result as string;
    if (!rawResult) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale down proportionally if larger than maxDimension
      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        callback(compressedBase64);
      } else {
        callback(rawResult);
      }
    };
    img.onerror = () => {
      callback(rawResult);
    };
    img.src = rawResult;
  };
  reader.readAsDataURL(file);
};
