import { SectionWrapper } from "./ui/SectionWrapper";

export function MapSection() {
  return (
    <SectionWrapper id="map" showPattern={false}>
      <div className="animate-fade-in-up w-full">
        <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-2">
          Lieu
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-8" dir="rtl">
          الموقع
        </p>

        <div className="w-full max-w-lg mx-auto border border-gold-accent/30 rounded-sm overflow-hidden">
          <iframe
            title="Trois-Rivières"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-72.60,46.33,-72.50,46.37&layer=mapnik&marker=46.350,-72.550"
            width="100%"
            height="320"
            className="block"
            loading="lazy"
            style={{ border: 0 }}
          />

          <a
            href="https://www.openstreetmap.org/?mlat=46.350&mlon=-72.550#map=13/46.350/-72.550"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 font-body text-sm text-text/50 hover:text-gold-accent transition-colors bg-surface-alt"
          >
            Voir sur la carte / شاهد على الخريطة
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
