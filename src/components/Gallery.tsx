import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
    alt: 'Volquete cargado en obra',
    title: 'Servicio en obras',
  },
  {
    src: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800',
    alt: 'Camión volquete trabajando',
    title: 'Flota de volquetes',
  },
  {
    src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800',
    alt: 'Material de construcción',
    title: 'Venta de materiales',
  },
  {
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
    alt: 'Trabajo de limpieza',
    title: 'Gestión de residuos',
  },
  {
    src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800',
    alt: 'Arena y tierra',
    title: 'Arena y tierra',
  },
  {
    src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800',
    alt: 'Proyecto finalizado',
    title: 'Proyectos completados',
  },
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className="section-padding bg-muted">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Galería
          </span>
          <h2 className="heading-secondary text-foreground mb-6">
            Nuestro trabajo en{' '}
            <span className="text-primary">imágenes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conoce la calidad de nuestros servicios a través de fotos reales de 
            trabajos realizados para nuestros clientes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-semibold">{image.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
            <div 
              className="max-w-5xl max-h-[85vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-center text-white mt-4 text-lg">
                {galleryImages[currentIndex].title}
              </p>
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
