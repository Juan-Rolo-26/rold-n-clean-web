import { useState, useEffect } from 'react';
import { Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Importing assets
import cartelRoldan from '@/assets/cartel-roldan.png';
import volquetes3 from '@/assets/volquetes3.jpeg';
import camion1 from '@/assets/camion1.jpeg';
import camion2 from '@/assets/camion2.jpeg';
import camion3 from '@/assets/camion3.jpeg';
import volquetes4 from '@/assets/volquetes4.jpeg';
import volquetes5 from '@/assets/volquetes5.jpeg';
import volquetes6 from '@/assets/volquetes6.jpeg';
import volquetes7 from '@/assets/volquetes7.jpeg';
import imagen1 from '@/assets/imagen 1.jpeg';

const heroImages = [
  camion1,
  volquetes3,
  camion2,
  volquetes4,
  camion3,
  volquetes5,
  volquetes6,
  volquetes7,
  imagen1,
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative h-[calc(100svh-var(--header-height))] min-h-[calc(100svh-var(--header-height))] w-full overflow-hidden bg-black">

      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for readability */}

        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom h-full flex flex-col justify-center items-center pt-14 md:pt-16 lg:pt-20 pb-20 text-center">
        <div data-reveal="fade-up" className="max-w-4xl space-y-6 md:space-y-7 flex flex-col items-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm tracking-wider uppercase">
            <Star className="w-4 h-4 text-tertiary fill-tertiary" />
            <span>Tu obra, cuidada y a tiempo</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
              VOLQUETES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/90 to-tertiary">
                ROLDAN
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
            Volquetes, tierra y retiro de residuos con atención cercana.
            <span className="block font-semibold text-white mt-2">Orden, limpieza y confianza en cada entrega.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full">
            <a href="tel:+5493413623232">
              <Button className="h-12 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-white font-semibold tracking-wide shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform ring-2 ring-tertiary/30">
                <Phone className="w-5 h-5 mr-3" />
                Llamar y coordinar
              </Button>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
