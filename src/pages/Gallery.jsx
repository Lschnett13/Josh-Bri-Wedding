import Header from "../components/Header";

import image1 from "../assets/image_1.JPG";
import image2 from "../assets/image_2.JPG";
import image3 from "../assets/image_3.JPG";
import image4 from "../assets/image_4.JPG";
import image5 from "../assets/image_5.JPG";
import image6 from "../assets/image_6.JPG";
import image7 from "../assets/image_7.JPG";
import image8 from "../assets/image_8.JPG";

const Gallery = () => {
  const photos = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="font-script text-primary text-4xl md:text-7xl text-center">
          Photo Gallery
        </h1>
        <div className="w-32 h-0.5 bg-primary mx-auto mt-2" />

        {/* Mobile: single column, Desktop: masonry-like 2 col */}
        <div className="mt-8 columns-1 md:columns-2 gap-4 space-y-4">
          {photos.map((src, i) => (
            <div key={i} className="break-inside-avoid">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full rounded-sm shadow-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;