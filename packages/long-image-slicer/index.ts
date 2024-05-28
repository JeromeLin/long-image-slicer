export interface ImageSlicerOptions {
  sliceHeight?: number;
}

class ImageSlicer {
  private sliceHeight;

  constructor(options?: ImageSlicerOptions) {
    this.sliceHeight = options?.sliceHeight || 500;
  }

  sliceFromUrl(imageSrc: string, callback?: (slices: string[]) => void) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      this._sliceImage(img, callback);
    };
    img.src = imageSrc!;
  }

  sliceFromFile(file: Blob, callback: (slices: string[]) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.sliceFromUrl(e.target!.result as string, callback);
    };
    reader.readAsDataURL(file);
  }

  async _sliceImage(image, callback) {
    const slices: string[] = [];
    const numSlices = Math.ceil(image.height / this.sliceHeight);

    for (let i = 0; i < numSlices; i++) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const curSliceHeight = (i === numSlices - 1) ? image.height - (i * this.sliceHeight) : this.sliceHeight;
      canvas.width = image.width;
      canvas.height = curSliceHeight;

      ctx!.drawImage(
        image,
        0, i * this.sliceHeight, image.width, curSliceHeight,
        0, 0, image.width, curSliceHeight
      );

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob!);
        slices.push(url);
        if (slices.length === numSlices) {
          callback(slices);
        }
      });
      // slices.push(canvas.toDataURL());
    }

    return slices;
  }
}

export default ImageSlicer;