import { useState } from 'React';
import ImageSlicer from 'long-image-slicer';

function App() {
  const [images, setImages] = useState<string[]>([]);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];

    const slicer = new ImageSlicer();
    slicer.sliceFromFile(file, (res) => {
      setImages(res);
    });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileChange} />

      <div className="imglist">
        {
          images.map((image, index) => (
            <img key={+index} src={image} />
          ))
        }
      </div>
    </div>
  )
}

export default App
