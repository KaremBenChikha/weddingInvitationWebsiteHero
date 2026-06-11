import { SectionWrapper } from "./ui/SectionWrapper";

export function GallerySection() {
  const photos = [
    { id: 1, color: "#2a2a5e", aspect: "aspect-[3/4]" },
    { id: 2, color: "#25255a", aspect: "aspect-square" },
    { id: 3, color: "#30306a", aspect: "aspect-[4/5]" },
    { id: 4, color: "#2d2d62", aspect: "aspect-[3/4]" },
    { id: 5, color: "#28285c", aspect: "aspect-square" },
    { id: 6, color: "#35355e", aspect: "aspect-[4/3]" },
  ];

  return (
    <SectionWrapper id="gallery" showPattern={false}>
      <div className="animate-fade-in-up w-full">
        {/* Masonry collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-lg mx-auto">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`${photo.aspect} relative opacity-0 animate-fade-in-up group`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Gold frame border */}
              <div className="absolute inset-0 border border-gold-accent/20 rounded-sm group-hover:border-gold-accent/40 transition-colors duration-500 z-10 pointer-events-none" />

              {/* Placeholder gradient */}
              <div
                className="w-full h-full rounded-sm"
                style={{ background: `linear-gradient(135deg, ${photo.color}, #1a1a3e)` }}
              />

              {/* Gold corner accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold-accent/30 z-20 pointer-events-none" />

              {/* Hover diamond */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L10.472 7.472L16 8L10.472 8.528L8 16L5.528 8.528L0 8L5.528 7.472L8 0Z" fill="#d4a843" opacity="0.8" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
