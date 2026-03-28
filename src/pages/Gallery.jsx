import Header from "../components/Header";

const Gallery = () => {
  // Placeholder array to represent 6 photos
  const photos = Array.from({ length: 6 });

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
          {photos.map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid w-full h-48 md:h-64 bg-nav rounded-sm shadow-md flex items-center justify-center text-white font-serif text-xl"
            >
              Photo {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;